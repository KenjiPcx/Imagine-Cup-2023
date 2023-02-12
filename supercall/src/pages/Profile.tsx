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
  createDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
} from "@hope-ui/solid";
import { IoRemoveCircle } from "solid-icons/io";
import { createResource, createSignal, For, Show, Suspense } from "solid-js";
import { Icon } from "@hope-ui/solid";
import { AiOutlineGithub } from "solid-icons/ai";
import {
  getUserAppSettingsUrl,
  loginUrl,
  saveUserTopicsUrl,
} from "../constants";
import { getUserInfo } from "../scripts/auth";
import MessageBox from "../components/analysis/MessageBox";
import { clientPrincipal } from "../scripts/types";
import AnalysisCard from "../components/analysis/AnalysisCard";
import { FaSolidPlus } from "solid-icons/fa";
import axios from "axios";
import RemoveTopicModal from "../components/profile/RemoveTopicModal";

const fetchProfileData: (
  user: clientPrincipal | any
) => Promise<string[]> = async (user) => {
  if (!user) {
    return [];
  }
  return [
    "test the size of this thing",
  ];
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
  const { isOpen, onOpen, onClose } = createDisclosure();
  const [topicToRemove, setTopicToRemove] = createSignal("");

  let newTopicInput: any;
  const addTopic = () => {
    if (topics) {
      mutate([...(topics() as string[]), newTopicInput.value]);
      newTopicInput.value = "";
    }
  };

  const removeTopic = () => {
    if (topics) {
      mutate((topics() as string[]).filter((t) => t !== topicToRemove()));
    }
    onClose();
  };

  const openTopicRemovalModal = (topic: string) => {
    setTopicToRemove(topic);
    onOpen();
  };

  const saveUserTopics = () => {
    if (user()) {
      try {
        axios.post(saveUserTopicsUrl, {
          userId: user().userId,
          topicsOfInterests: topics(),
        });
        refetch();
      } catch (err) {
        console.warn(err);
      }
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
                  <Box mt="$4">
                    <For each={topics()}>
                      {(topic) => (
                        <Box position="relative" w="95.5%" mb="$6">
                          <MessageBox message={topic}>
                            <Flex
                              ml="$4"
                              alignItems={"center"}
                              position="absolute"
                              right="0"
                              top="50%"
                              transform={"translateX(50%) translateY(-50%)"}
                            >
                              <IconButton
                                aria-label={`remove ${topic}`}
                                icon={<IoRemoveCircle />}
                                colorScheme={"danger"}
                                rounded="$3xl"
                                onClick={() => openTopicRemovalModal(topic)}
                                size="sm"
                              />
                            </Flex>
                          </MessageBox>
                        </Box>
                      )}
                    </For>
                  </Box>
                  <FormControl mt="$12" mx="auto">
                    <FormLabel for="Topic">Add a new topic 👇</FormLabel>
                    <Flex justifyContent={"center"} alignItems="center">
                      <Input
                        ref={newTopicInput}
                        id="Topic"
                        outline={"solid"}
                        flexGrow={1}
                      />
                      <Flex ml="$3" alignItems={"center"}>
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
                    </Flex>
                  </FormControl>
                  <Center mt="$8">
                    <Button mx="auto" size="sm" onClick={saveUserTopics}>
                      Save Topics
                    </Button>
                  </Center>
                </Suspense>
              </AnalysisCard>
            </Box>
          </Show>
        </Flex>
      </Suspense>
      <RemoveTopicModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        topicToRemove={topicToRemove}
        removeTopic={removeTopic}
      />
    </Box>
  );
}
