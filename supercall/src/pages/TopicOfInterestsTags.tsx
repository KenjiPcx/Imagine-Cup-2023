import { Center, Heading, Flex, Text, Spinner } from "@hope-ui/solid";
import axios from "axios";
import { Show, For, createSignal, createResource, Suspense } from "solid-js";
import ContentOfInterestInfoCard from "../components/productivity/ContentOfInterestCard";
import { getAllContentOfInterestsUrl } from "../constants";
import { mockUser } from "../scripts/mockData";
import { clientPrincipal, ContentOfInterest } from "../scripts/types";

const fetchContentOfInterestsForUser = async (user: clientPrincipal | null) => {
  console.log("called");
  if (!user) {
    console.log("Not logger id");
    return [];
  }
  const res = await axios.post(getAllContentOfInterestsUrl, {
    userId: user.userId,
  });
  console.log(res.data);

  return res.data as ContentOfInterest[];
};

export default function AllContentOfInterests() {
  // const [user] = createResource(getUserInfo);
  const [user, setUser] = createSignal(mockUser);
  const [contentOfInterests] = createResource(
    user(),
    fetchContentOfInterestsForUser
  );

  return (
    <>
      <Center mb="$6" flex={"auto"} flexDirection="column">
        <Heading size={"xl"}>Brain Dump</Heading>
        <Text size={"lg"}>Content based on your latest interests!</Text>
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
            when={contentOfInterests() && contentOfInterests()!.length > 0}
            fallback={<Center w="$full">No Content Of Interests found</Center>}
          >
            <Flex flexDirection={"column"} w="$full">
              <For each={contentOfInterests()}>
                {(content: ContentOfInterest) => (
                  <ContentOfInterestInfoCard contentOfInterest={content} />
                )}
              </For>
            </Flex>
          </Show>
        </Suspense>
      </Flex>
    </>
  );
}
