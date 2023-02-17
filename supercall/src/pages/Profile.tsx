import {
  Box,
  Avatar,
  Center,
  Heading,
  Text,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  createDisclosure,
} from "@hope-ui/solid";
import {
  createResource,
  createSignal,
  For,
  lazy,
  Show,
  Suspense,
} from "solid-js";
import { getUserAppSettingsUrl, saveUserTopicsUrl } from "../constants";
import { getUserInfo } from "../scripts/auth";
import { clientPrincipal } from "../scripts/types";
import AnalysisCard from "../components/analysis/AnalysisCard";
import { FaSolidPlus } from "solid-icons/fa";
import axios from "axios";
import RemoveTopicModal from "../components/profile/RemoveTopicModal";
import TopicsBox from "../components/profile/TopicsBox";
import AuthorizedUserCard from "../components/profile/AuthorizedUserCard";
import { mockUser } from "../scripts/mockData";

const AnonUserCard = lazy(() => import("../components/profile/AnonUserCard"));
const TopicsFallbackCard = lazy(
  () => import("../components/profile/TopicsFallbackCard")
);

const fetchProfileData: (
  user: clientPrincipal | any
) => Promise<string[]> = async (user) => {
  if (!user) {
    return [];
  }
  // return ["test the size of this thing"];
  const res = await axios.post(getUserAppSettingsUrl, {
    userId: user.userId,
  });
  console.log(res.data.appSettings.topicsOfInterests);
  const topics = res.data.appSettings.topicsOfInterests;
  return topics;
};

export default function Profile() {
  // const [user] = createResource<clientPrincipal | null>(getUserInfo);
  const [user, setUser] = createSignal(mockUser);
  const [topics, { mutate, refetch }] = createResource(
    user(),
    fetchProfileData
  );
  const { isOpen, onOpen, onClose } = createDisclosure();
  const [topicToRemove, setTopicToRemove] = createSignal("");

  let newTopicInput: any;
  const addTopic = () => {
    if (topics()) {
      mutate([...(topics() as string[]), newTopicInput.value]);
      newTopicInput.value = "";
    }
  };

  const removeTopic = () => {
    if (topics()) {
      mutate((topics() as string[]).filter((t) => t !== topicToRemove()));
    }
    onClose();
  };

  const openTopicRemovalModal = (topic: string) => {
    setTopicToRemove(topic);
    onOpen();
  };

  const saveUserTopics = async () => {
    if (!user()) {
      return;
    }
    try {
      await axios.post(saveUserTopicsUrl, {
        userId: user()!.userId,
        topicsOfInterests: topics(),
      });
    } catch (err) {
      console.warn(err);
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
          <Show when={user() !== null} fallback={<AnonUserCard />}>
            <AuthorizedUserCard user={user} />

            {/* <Heading>Todo: Refactor list</Heading> */}
            <Box w="85%">
              <AnalysisCard heading={"Topics of interests list"}>
                <Suspense fallback={<TopicsFallbackCard />}>
                  <Box mt="$4">
                    <For each={topics()}>
                      {(topic) => (
                        <TopicsBox
                          topic={topic}
                          openTopicRemovalModal={openTopicRemovalModal}
                        />
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
