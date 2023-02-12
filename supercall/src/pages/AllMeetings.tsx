import { Center, Heading, Flex, Text, Spinner } from "@hope-ui/solid";
import axios from "axios";
import { Show, For, createSignal, createResource, Suspense } from "solid-js";
import MeetingInfoCard from "../components/productivity/MeetingInfoCard";
import { getAllMeetingsUrl } from "../constants";
import { mockUser } from "../scripts/mockData";
import { clientPrincipal, Meeting } from "../scripts/types";

const fetchMeetingsForUser = async (user: clientPrincipal | null) => {
  console.log("called");
  if (!user) {
    console.log("Not logger id");
    return [];
  }
  const res = await axios.post(getAllMeetingsUrl, {
    userId: user.userId,
  });
  console.log(res.data);

  const meetings = (res.data as any[]).map((rec) => rec.meetings).flat();
  console.log(meetings);
  return meetings;
};

export default function AllMeetings() {
  // const [user] = createResource(getUserInfo);
  const [user, setUser] = createSignal(mockUser);
  const [meetings] = createResource(user(), fetchMeetingsForUser);

  return (
    <>
      <Center mb="$6" flex={"auto"} flexDirection="column">
        <Heading size={"xl"}>Meetings</Heading>
        <Text size={"lg"}>Use here to plan your meets 🤝</Text>
      </Center>

      <Flex
        minH="62.5vh"
        overflow="scroll"
        p="$4"
        bgColor="$neutral6"
        rounded="$sm"
      >
        <Suspense
          fallback={
            <Center w="$full">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="$neutral4"
                color="$info10"
                size="xl"
              />
            </Center>
          }
        >
          <Show
            when={meetings() && meetings()!.length > 0}
            fallback={<Center w="$full">No meetings found</Center>}
          >
            <Flex flexDirection={"column"}>
              <For each={meetings()}>
                {(meeting: Meeting) => <MeetingInfoCard meeting={meeting} />}
              </For>
            </Flex>
          </Show>
        </Suspense>
      </Flex>
    </>
  );
}
