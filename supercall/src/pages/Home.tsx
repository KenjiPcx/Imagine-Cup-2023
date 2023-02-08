import { InteractionType } from "@azure/msal-browser";
import { Box } from "@hope-ui/solid";
import { createEffect } from "solid-js";
import {
  useAccount,
  useMsalAuthentication,
  useMsal,
} from "../components/auth/AuthProvider";

export default function Home() {
  const { accounts } = useMsal();
  createEffect(() => {
    console.warn("HELLO");
    console.log(accounts);
    console.warn("HELLO");
  });
  const account = useAccount();
  console.log(account());
  return <Box>Hello {account()?.username}</Box>;
}
