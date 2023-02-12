import { clientPrincipal } from "./types";

export const getUserInfo: () => Promise<clientPrincipal | null> = async () => {
  const response = await fetch("/.auth/me");
  const payload = await response.json();
  const { clientPrincipal } = payload;
  return clientPrincipal;
};
