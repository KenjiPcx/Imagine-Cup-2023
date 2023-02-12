import { Center, Flex, Heading, Text } from "@hope-ui/solid";
import axios from "axios";
import { createResource, createSignal, For, Show } from "solid-js";
import CallInfoCard from "../components/productivity/CallInfoCard";
import { getAllCallByUserIdUrl } from "../constants";
import { getUserInfo } from "../scripts/auth";
import { mockUser } from "../scripts/mockData";
import { CallItem, clientPrincipal } from "../scripts/types";

const fetchCallsForUser = async (user: clientPrincipal | null) => {
  console.log("called");
  if (!user) {
    console.log("Not logger id");
    return [];
  }
  const res = await axios.post(getAllCallByUserIdUrl, {
    userId: user.userId,
  });
  console.log(res.data);
  return res.data;
};

export default function CallHistory() {
  // const [user] = createResource(getUserInfo);
  const [user, setUser] = createSignal(mockUser);
  const [calls] = createResource(user(), fetchCallsForUser);
  return (
    <>
      <Center mb="$6" flex={"auto"} flexDirection="column">
        <Heading size={"xl"}>Call History</Heading>
        <Text size={"lg"}>We remember for you 🧠</Text>
      </Center>

      <Flex
        minH="62.5vh"
        overflow="scroll"
        p="$4"
        bgColor="$neutral6"
        rounded="$sm"
      >
        <Show
          when={calls() && calls().length > 0}
          fallback={<Center w="$full">No calls found</Center>}
        >
          <For each={calls()}>
            {(call: CallItem) => <CallInfoCard call={call} />}
          </For>
        </Show>
      </Flex>
    </>
  );
}
