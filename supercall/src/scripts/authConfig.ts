import {
  LogLevel,
  Configuration,
  EventType,
  PublicClientApplication,
  AccountInfo,
  IPublicClientApplication,
} from "@azure/msal-browser";

// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const msedge = ua.indexOf("Edge/");
const firefox = ua.indexOf("Firefox");
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: "bdc45a6a-d3e8-4020-9a03-88cf17fc10b9",
    redirectUri: "/",
    postLogoutRedirectUri: "/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: isIE || isEdge || isFirefox,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me",
};

export type AccountIdentifiers = Partial<
  Pick<AccountInfo, "homeAccountId" | "localAccountId" | "username">
>;

export const accountArraysAreEqual = (
  arrayA: Array<AccountIdentifiers>,
  arrayB: Array<AccountIdentifiers>
): boolean => {
  if (arrayA.length !== arrayB.length) {
    return false;
  }

  const comparisonArray = [...arrayB];

  return arrayA.every((elementA) => {
    const elementB = comparisonArray.shift();
    if (!elementA || !elementB) {
      return false;
    }

    return (
      elementA.homeAccountId === elementB.homeAccountId &&
      elementA.localAccountId === elementB.localAccountId &&
      elementA.username === elementB.username
    );
  });
};

export function getAccountByIdentifiers(
  allAccounts: AccountInfo[],
  accountIdentifiers: AccountIdentifiers
): AccountInfo | null {
  if (
    allAccounts.length > 0 &&
    (accountIdentifiers.homeAccountId ||
      accountIdentifiers.localAccountId ||
      accountIdentifiers.username)
  ) {
    const matchedAccounts = allAccounts.filter((accountObj) => {
      if (
        accountIdentifiers.username &&
        accountIdentifiers.username.toLowerCase() !==
          accountObj.username.toLowerCase()
      ) {
        return false;
      }
      if (
        accountIdentifiers.homeAccountId &&
        accountIdentifiers.homeAccountId.toLowerCase() !==
          accountObj.homeAccountId.toLowerCase()
      ) {
        return false;
      }
      if (
        accountIdentifiers.localAccountId &&
        accountIdentifiers.localAccountId.toLowerCase() !==
          accountObj.localAccountId.toLowerCase()
      ) {
        return false;
      }

      return true;
    });

    return matchedAccounts[0] || null;
  } else {
    return null;
  }
}

export const initAuth = () => {
  const msalInstance = new PublicClientApplication(msalConfig);

  // Default to using the first account if no account is active on page load
  if (
    !msalInstance.getActiveAccount() &&
    msalInstance.getAllAccounts().length > 0
  ) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  // Optional - This will update account state if a user signs in from another tab or window
  msalInstance.enableAccountStorageEvents();
  msalInstance.addEventCallback((event: any) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      const account = event.payload.account;
      msalInstance.setActiveAccount(account);
    }
  });

  return msalInstance;
};

export const isAuthenticated = (
  allAccounts: AccountInfo[],
  matchAccount?: AccountIdentifiers
): boolean => {
  if (
    matchAccount &&
    (matchAccount.username ||
      matchAccount.homeAccountId ||
      matchAccount.localAccountId)
  ) {
    console.log(getAccountByIdentifiers(allAccounts, matchAccount) );
    return !!getAccountByIdentifiers(allAccounts, matchAccount);
  }

  return allAccounts.length > 0;
};

export function getAccount(
  instance: IPublicClientApplication,
  accountIdentifiers?: AccountIdentifiers
): AccountInfo | null {
  if (
    !accountIdentifiers ||
    (!accountIdentifiers.homeAccountId &&
      !accountIdentifiers.localAccountId &&
      !accountIdentifiers.username)
  ) {
    // If no account identifiers are provided, return active account
    return instance.getActiveAccount();
  }

  return getAccountByIdentifiers(instance.getAllAccounts(), accountIdentifiers);
}
