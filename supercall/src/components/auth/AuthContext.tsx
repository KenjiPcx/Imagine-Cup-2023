import {
  IPublicClientApplication,
  stubbedPublicClientApplication,
  Logger,
  InteractionStatus,
  AccountInfo,
} from "@azure/msal-browser";
import { createContext } from "solid-js";

export type MsalContext = {
  instance: IPublicClientApplication;
  inProgress: InteractionStatus;
  accounts: AccountInfo[];
  logger: Logger;
};

const defaultMsalContext: MsalContext = {
  instance: stubbedPublicClientApplication,
  inProgress: InteractionStatus.None,
  accounts: [],
  logger: new Logger({}),
};

export const AuthContext = createContext(defaultMsalContext);
