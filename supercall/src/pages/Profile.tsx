import {
  Box,
  Avatar,
  Center,
  Heading,
  Text,
  Anchor,
  Button,
  Flex,
  UnorderedList,
  ListItem,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  VStack,
  Spinner,
} from "@hope-ui/solid";
import { createResource, createSignal, For, Show, Suspense } from "solid-js";
import { Icon } from "@hope-ui/solid";
import { AiOutlineGithub } from "solid-icons/ai";
import { getUserAppSettingsUrl, loginUrl } from "../constants";
import { getUserInfo } from "../scripts/auth";
import MessageBox from "../components/analysis/MessageBox";
import { clientPrincipal } from "../scripts/types";
import AnalysisCard from "../components/analysis/AnalysisCard";
import { FaSolidPlus } from "solid-icons/fa";
import axios from "axios";

const fetchProfileData: (
  user: clientPrincipal | any
) => Promise<string[]> = async (user) => {
  if (!user) {
    return [];
  }
  // return ["test"];
  const res = await axios.post(getUserAppSettingsUrl, {
    userId: user.userId,
  });
  console.log(res.data.appSettings.topicsOfInterests);
  const topics = res.data.appSettings.topicsOfInterests;
  return topics;
};

const defUser = {
  userDetails: "kenjipcx",
  userRoles: ["test"],
  identityProvider: "test",
  userId: "f62009ecfc354c1499137b8347884940",
  claims: [],
};
export default function Profile() {
  // const [user] = createResource<clientPrincipal | null>(getUserInfo);
  const [user, setUser] = createSignal(defUser);
  const [topics, { mutate, refetch }] = createResource(
    user(),
    fetchProfileData
  );
  // const user: () => clientPrincipal = () => {
  //   return {
  //     userDetails: "test",
  //     userRoles: ["test"],
  //     identityProvider: "test",
  //     userId: "test",
  //     claims: [],
  //   };
  // };

  let newTopicInput: any;
  const addTopic = () => {
    if (topics) {
      mutate([...(topics() as string[]), newTopicInput.value]);
      newTopicInput.value = "";
    }
  };

  return (
    <Box>
      <Suspense fallback={<Center>Loading...</Center>}>
        <Center mb="$6" flex={"auto"} flexDirection="column">
          <Heading size={"xl"}>User Profile</Heading>
          <Text size={"lg"}>A place all about you 🫵💖</Text>
        </Center>

        <Flex flexDirection={"column"} alignItems="center" gap="$8">
          <Show
            when={user() !== null}
            fallback={
              <>
                <Avatar size={"2xl"} name="U" src="broken-link" />
                <Box w={"80%"}>
                  <MessageBox
                    message={"You need to login to view your profile"}
                  >
                    <Heading mt="$2">Loging in will also allow you to</Heading>
                    <UnorderedList>
                      <ListItem>Add Personalization</ListItem>
                      <ListItem>Save Calls</ListItem>
                      <ListItem>View Call History</ListItem>
                      <ListItem>
                        Access your personal knowledge dump bank
                      </ListItem>
                    </UnorderedList>
                  </MessageBox>
                </Box>
                <Anchor href={loginUrl}>
                  <Button colorScheme={"info"}>
                    <Icon as={AiOutlineGithub} mr="$2" boxSize="$6" />
                    Login with GitHub
                  </Button>
                </Anchor>
              </>
            }
          >
            <Avatar
              size={"2xl"}
              name={user()?.userDetails || "Default Username"}
              src="broken-link"
            />

            <Box
              bgColor={"$info8"}
              px="$3"
              py="$2"
              rounded={"$md"}
              w="85%"
              textAlign={"center"}
            >
              <Heading size={"lg"} mt="$2">
                UserId: {user().userId}
              </Heading>
              <Heading size={"lg"} my="$2">
                Username: {user().userDetails}
              </Heading>
            </Box>

            <Box w="85%">
              <AnalysisCard heading={"Topics of interests list"}>
                <Suspense
                  fallback={
                    <Flex
                      my="$16"
                      flexDirection={"column"}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="$neutral4"
                        color="$info10"
                        size="xl"
                      />
                      <Heading mt="$4">Loading topics of interests...</Heading>
                    </Flex>
                  }
                >
                  <Box>
                    <For each={topics()}>
                      {(topic) => <MessageBox message={topic} />}
                    </For>
                  </Box>
                  <FormControl mt="$12" w="95%" mx="auto">
                    <FormLabel for="Topic">Add a new topic 👇</FormLabel>
                    <Flex justifyContent={"center"} alignItems="center">
                      <Input
                        ref={newTopicInput}
                        id="Topic"
                        outline={"solid"}
                        mr="$3"
                        w="90%"
                        onChange={() => console.log(newTopicInput.value)}
                      />
                      <IconButton
                        aria-label="Add new topic"
                        icon={<FaSolidPlus />}
                        size="sm"
                        colorScheme={"success"}
                        boxSize="$8"
                        onClick={addTopic}
                      >
                        Plus
                      </IconButton>
                    </Flex>
                  </FormControl>
                  <Center mt="$6">
                    <Button mx="auto" size="sm">
                      Save Topics
                    </Button>
                  </Center>
                </Suspense>
              </AnalysisCard>
            </Box>
          </Show>
        </Flex>
      </Suspense>
    </Box>
  );
}
