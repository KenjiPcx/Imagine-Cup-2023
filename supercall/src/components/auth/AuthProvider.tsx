import {
  Accessor,
  createEffect,
  createSignal,
  JSX,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { MsalContext, AuthContext } from "./AuthContext";
import {
  IPublicClientApplication,
  EventMessage,
  EventMessageUtils,
  InteractionStatus,
  Logger,
  AccountInfo,
  AccountEntity,
  AuthenticationResult,
  AuthError,
  EventType,
  InteractionRequiredAuthError,
  InteractionType,
  OIDC_DEFAULT_SCOPES,
  PopupRequest,
  RedirectRequest,
  SilentRequest,
  SsoSilentRequest,
} from "@azure/msal-browser";
import {
  accountArraysAreEqual,
  AccountIdentifiers,
  getAccount,
  isAuthenticated,
} from "../../scripts/authConfig";

interface AuthProviderProps {
  instance: IPublicClientApplication;
  children: JSX.Element;
  count?: number;
}

type MsalState = {
  inProgress: InteractionStatus;
  accounts: AccountInfo[];
};

type MsalProviderReducerAction = {
  type: MsalProviderActionType;
  payload: {
    logger: Logger;
    instance: IPublicClientApplication;
    message?: EventMessage;
  };
};
enum MsalProviderActionType {
  UNBLOCK_INPROGRESS = "UNBLOCK_INPROGRESS",
  EVENT = "EVENT",
}

export function AuthProvider(props: AuthProviderProps) {
  let instance = props.instance;
  const logger = instance.getLogger().clone("@azure/msal-solid", "1.5.3");

  const [state, setState] = createStore<MsalState>({
    inProgress: InteractionStatus.Startup,
    accounts: instance.getAllAccounts(),
  });

  const updateState = (action: MsalProviderReducerAction) => {
    const { type, payload } = action;
    let newInProgress = state.inProgress;

    switch (type) {
      case MsalProviderActionType.UNBLOCK_INPROGRESS:
        if (state.inProgress === InteractionStatus.Startup) {
          newInProgress = InteractionStatus.None;
          payload.logger.info(
            "MsalProvider - handleRedirectPromise resolved, setting inProgress to 'none'"
          );
        }
        break;
      case MsalProviderActionType.EVENT:
        const message = payload.message as EventMessage;
        const status = EventMessageUtils.getInteractionStatusFromEvent(
          message,
          state.inProgress
        );
        if (status) {
          payload.logger.info(
            `MsalProvider - ${message.eventType} results in setting inProgress from ${state.inProgress} to ${status}`
          );
          newInProgress = status;
        }
        break;
      default:
        throw new Error(`Unknown action type: ${type}`);
    }

    const currentAccounts = payload.instance.getAllAccounts();
    if (
      newInProgress !== state.inProgress &&
      !accountArraysAreEqual(currentAccounts, state.accounts)
    ) {
      console.log("Changed", currentAccounts);
      // Both inProgress and accounts changed
      setState({
        ...state,
        inProgress: newInProgress,
        accounts: currentAccounts,
      });
    } else if (newInProgress !== state.inProgress) {
      // Only only inProgress changed
      setState({
        ...state,
        inProgress: newInProgress,
      });
    } else if (!accountArraysAreEqual(currentAccounts, state.accounts)) {
      console.log("Changed 2", currentAccounts);
      // Only accounts changed
      setState({
        ...state,
        accounts: currentAccounts,
      });
    }
  };

  createEffect(() => {
    console.log("Called ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    const callbackId = instance.addEventCallback((message: EventMessage) => {
      updateState({
        payload: {
          instance,
          logger,
          message,
        },
        type: MsalProviderActionType.EVENT,
      });
    });
    logger.verbose(
      `MsalProvider - Registered event callback with id: ${callbackId}`
    );

    instance.initialize().then(() => {
      instance
        .handleRedirectPromise()
        .catch(() => {
          // Errors should be handled by listening to the LOGIN_FAILURE event
          return;
        })
        .finally(() => {
          /*
           * If handleRedirectPromise returns a cached promise the necessary events may not be fired
           * This is a fallback to prevent inProgress from getting stuck in 'startup'
           */
          updateState({
            payload: {
              instance,
              logger,
            },
            type: MsalProviderActionType.UNBLOCK_INPROGRESS,
          });
        });
    });

    return () => {
      // Remove callback when component unmounts or accounts change
      if (callbackId) {
        logger.verbose(`MsalProvider - Removing event callback ${callbackId}`);
        instance.removeEventCallback(callbackId);
      }
    };
  });

  createEffect(() => {
    console.log(state);
  });

  const contextValue: MsalContext = {
    instance,
    inProgress: state.inProgress,
    accounts: state.accounts,
    logger,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useMsal() {
  return useContext(AuthContext);
}

/**
 * Returns whether or not a user is currently signed-in. Optionally provide 1 or more accountIdentifiers to determine if a specific user is signed-in
 * @param matchAccount
 */
export function useIsAuthenticated(
  matchAccount?: AccountIdentifiers
): Accessor<boolean> {
  const state = useMsal();

  const [hasAuthenticated, setHasAuthenticated] = createSignal<boolean>(
    state.inProgress === InteractionStatus.Startup
      ? false
      : isAuthenticated(state.accounts, matchAccount)
  );

  createEffect(() => {
    console.log("Working");
    console.warn(state.accounts);
    console.warn(isAuthenticated(state.accounts, matchAccount));
    setHasAuthenticated(isAuthenticated(state.accounts, matchAccount));
  });

  return hasAuthenticated;
}

/**
 * Given 1 or more accountIdentifiers, returns the Account object if the user is signed-in
 * @param accountIdentifiers
 */
export function useAccount(
  accountIdentifiers?: AccountIdentifiers
): Accessor<AccountInfo | null> {
  const { instance, inProgress, logger } = useMsal();
  const initialAccount = getAccount(instance, accountIdentifiers);
  const [account, setAccount] = createSignal<AccountInfo | null>(
    initialAccount
  );

  createEffect(() => {
    setAccount((currentAccount: AccountInfo | null) => {
      const nextAccount = getAccount(instance, accountIdentifiers);
      if (
        !AccountEntity.accountInfoIsEqual(currentAccount, nextAccount, true)
      ) {
        logger.info("useAccount - Updating account");
        return nextAccount;
      }

      return currentAccount;
    });
  });

  return account;
}

export type MsalAuthenticationResult = {
  login: (
    callbackInteractionType?: InteractionType | undefined,
    callbackRequest?: PopupRequest | RedirectRequest | SilentRequest
  ) => Promise<AuthenticationResult | null>;
  acquireToken: (
    callbackInteractionType?: InteractionType | undefined,
    callbackRequest?: SilentRequest | undefined
  ) => Promise<AuthenticationResult | null>;
  result: AuthenticationResult | null;
  error: AuthError | null;
};

/**
 * If a user is not currently signed in this hook invokes a login. Failed logins can be retried using the login callback returned.
 * If a user is currently signed in this hook attempts to acquire a token. Subsequent token requests can use the acquireToken callback returned.
 * Optionally provide a request object to be used in the login/acquireToken call.
 * Optionally provide a specific user that should be logged in.
 * @param interactionType
 * @param authenticationRequest
 * @param accountIdentifiers
 */
export function useMsalAuthentication(
  interactionType: InteractionType,
  authenticationRequest?: PopupRequest | RedirectRequest | SsoSilentRequest,
  accountIdentifiers?: AccountIdentifiers
): MsalAuthenticationResult {
  const { instance, inProgress, logger } = useMsal();
  const isAuthenticated = useIsAuthenticated(accountIdentifiers);
  const account = useAccount(accountIdentifiers);
  const [response, setResponse] = createSignal<
    [AuthenticationResult | null, AuthError | null]
  >([null, null]);

  // Boolean used to check if interaction is in progress in acquireTokenSilent fallback. Use Ref instead of state to prevent acquireToken function from being regenerated on each change to interactionInProgress value
  let interactionInProgress = inProgress !== InteractionStatus.None;
  createEffect(() => {
    interactionInProgress = inProgress !== InteractionStatus.None;
  });

  // Flag used to control when the hook calls login/acquireToken
  let shouldAcquireToken = true;
  createEffect(() => {
    if (!!response()[1]) {
      // Errors should be handled by consuming component
      shouldAcquireToken = false;
      return;
    }

    if (!!response()[0]) {
      // Token has already been acquired, consuming component/application is responsible for renewing
      shouldAcquireToken = false;
      return;
    }
  });

  const login = async (
    callbackInteractionType?: InteractionType,
    callbackRequest?: PopupRequest | RedirectRequest | SsoSilentRequest
  ): Promise<AuthenticationResult | null> => {
    const loginType = callbackInteractionType || interactionType;
    const loginRequest = callbackRequest || authenticationRequest;
    switch (loginType) {
      case InteractionType.Popup:
        logger.verbose("useMsalAuthentication - Calling loginPopup");
        return instance.loginPopup(loginRequest as PopupRequest);
      case InteractionType.Redirect:
        // This promise is not expected to resolve due to full frame redirect
        logger.verbose("useMsalAuthentication - Calling loginRedirect");
        return instance
          .loginRedirect(loginRequest as RedirectRequest)
          .then(null);
      case InteractionType.Silent:
        logger.verbose("useMsalAuthentication - Calling ssoSilent");
        return instance.ssoSilent(loginRequest as SsoSilentRequest);
      default:
        console.error("Error: Invalid interaction type");
        throw new Error("Invalid interaction type");
    }
  };

  const acquireToken = async (
    callbackInteractionType?: InteractionType,
    callbackRequest?: SilentRequest
  ): Promise<AuthenticationResult | null> => {
    const fallbackInteractionType = callbackInteractionType || interactionType;

    let tokenRequest: SilentRequest;

    if (callbackRequest) {
      logger.trace(
        "useMsalAuthentication - acquireToken - Using request provided in the callback"
      );
      tokenRequest = {
        ...callbackRequest,
      };
    } else if (authenticationRequest) {
      logger.trace(
        "useMsalAuthentication - acquireToken - Using request provided in the hook"
      );
      tokenRequest = {
        ...authenticationRequest,
        scopes: authenticationRequest.scopes || OIDC_DEFAULT_SCOPES,
      };
    } else {
      logger.trace(
        "useMsalAuthentication - acquireToken - No request object provided, using default request."
      );
      tokenRequest = {
        scopes: OIDC_DEFAULT_SCOPES,
      };
    }

    if (!tokenRequest.account && account()) {
      logger.trace(
        "useMsalAuthentication - acquireToken - Attaching account to request"
      );
      tokenRequest.account = account() as AccountInfo;
    }

    const getToken = async (): Promise<AuthenticationResult | null> => {
      logger.verbose("useMsalAuthentication - Calling acquireTokenSilent");
      return instance
        .acquireTokenSilent(tokenRequest)
        .catch(async (e: AuthError) => {
          if (e instanceof InteractionRequiredAuthError) {
            if (!interactionInProgress) {
              logger.error(
                "useMsalAuthentication - Interaction required, falling back to interaction"
              );
              return login(fallbackInteractionType, tokenRequest);
            } else {
              logger.error(
                "useMsalAuthentication - Interaction required but is already in progress. Please try again, if needed, after interaction completes."
              );
              throw new Error("Interaction in progress");
            }
          }

          throw e;
        });
    };

    return getToken()
      .then((response: AuthenticationResult | null) => {
        setResponse([response, null]);
        return response;
      })
      .catch((e: AuthError) => {
        setResponse([null, e]);
        throw e;
      });
  };

  createEffect(() => {
    const callbackId = instance.addEventCallback((message: EventMessage) => {
      switch (message.eventType) {
        case EventType.LOGIN_SUCCESS:
        case EventType.SSO_SILENT_SUCCESS:
          if (message.payload) {
            setResponse([message.payload as AuthenticationResult, null]);
          }
          break;
        case EventType.LOGIN_FAILURE:
        case EventType.SSO_SILENT_FAILURE:
          if (message.error) {
            setResponse([null, message.error as AuthError]);
          }
          break;
      }
    });
    logger.verbose(
      `useMsalAuthentication - Registered event callback with id: ${callbackId}`
    );

    return () => {
      if (callbackId) {
        logger.verbose(
          `useMsalAuthentication - Removing event callback ${callbackId}`
        );
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance, logger]);

  createEffect(() => {
    if (shouldAcquireToken && inProgress === InteractionStatus.None) {
      shouldAcquireToken = false;
      if (!isAuthenticated) {
        logger.info(
          "useMsalAuthentication - No user is authenticated, attempting to login"
        );
        login().catch(() => {
          // Errors are saved in state above
          return;
        });
      } else if (account()) {
        logger.info(
          "useMsalAuthentication - User is authenticated, attempting to acquire token"
        );
        acquireToken().catch(() => {
          // Errors are saved in state above
          return;
        });
      }
    }
  });

  let result = response()[0];
  let error = response()[1];

  return {
    login,
    acquireToken,
    result,
    error,
  };
}
