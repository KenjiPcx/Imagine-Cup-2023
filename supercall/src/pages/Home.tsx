import {
  Box,
  Button,
  Center,
  createDisclosure,
  Flex,
  Heading,
  Text,
  VStack,
} from "@hope-ui/solid";
import axios from "axios";
import {
  createEffect,
  createResource,
  createSignal,
  For,
  lazy,
  Show,
} from "solid-js";
import { createStore } from "solid-js/store";
import {
  analyzeMessagesUrl,
  identifyContentOfInterestUrl,
  identifyMeetingsUrl,
  identifyScamsUrl,
  identifyTasksUrl,
  summarizeMessagesUrl,
} from "../constants";
import { initRecognizer } from "../scripts/azureAiHelpers";

import {
  mockAnalyzeMessagesResult,
  mockContentOfInterests,
  mockMessages3,
  mockUserInterests,
} from "../scripts/mockData";
import {
  AnalyzeMessagesResult,
  clientPrincipal,
  ContentOfInterest,
  Meeting,
  ScamDetectionResult,
  Task,
} from "../scripts/types";
import ContentOfInterestCard from "../components/analysis/ContentOfInterestCard";
import ScamDetectionResultsModal from "../components/analysis/ScamDetectionResultsModal";
import {
  showLoadingNotification,
  showLoadingNotificationForAiProcessing,
  updateLoadingNotification,
  updateLoadingNotificationForFailedJob,
  updateLoadingNotificationForSuccessfulJob,
} from "../scripts/notificationServiceHelper";
import { getUserInfo } from "../scripts/auth";

const ActionsMenu = lazy(() => import("../components/analysis/ActionsMenu"));
const AnalyzeMessagesResultCard = lazy(
  () => import("../components/analysis/AnalyzeMessagesResultCard")
);
const MeetingsCard = lazy(() => import("../components/analysis/MeetingsCard"));
const TasksCard = lazy(() => import("../components/analysis/TasksCard"));
const MessagesStore = lazy(
  () => import("../components/analysis/MessagesStore")
);
const SummarizeMessagesCard = lazy(
  () => import("../components/analysis/SummarizeMessageCard")
);

const speechKey = import.meta.env.VITE_SPEECH_KEY as string;
const speechRegion = import.meta.env.VITE_SPEECH_REGION as string;
const defaultAnalyzeMessagesResult: AnalyzeMessagesResult = {
  show: false,
  hasTasksOrPotentialTasks: false,
  hasBookingsOrAppointments: false,
  topicsOfInterestsFound: [],
};
const defaultScamDetectionResult: ScamDetectionResult = {
  isScam: false,
  warnings: [],
  advice: "",
};

export default function Home() {
  const [user] = createResource<clientPrincipal | null>(getUserInfo);
  const [start, setStart] = createSignal(false);
  const [messages, setMessages] = createSignal<string[]>(mockMessages3);
  const [analyzeMessagesResult, setAnalyzeMessagesResult] = createSignal(
    mockAnalyzeMessagesResult
  );
  const [summaryResults, setSummaryResults] = createSignal("");
  const [meetingsDetectionRes, setMeetingsDetectionRes] = createStore<
    Meeting[]
  >([]);
  const [tasksDetectionRes, setTasksDetectionRes] = createStore<Task[]>([]);
  const [scamDetectionRes, setScamDetectionRes] =
    createStore<ScamDetectionResult>(defaultScamDetectionResult);
  const {
    isOpen: isScamDetectionModalOpen,
    onOpen: onScamDetectionModalOpen,
    onClose: onScamDetectionModalClose,
  } = createDisclosure();
  const [contentOfInterests, setContentOfInterests] = createStore<
    ContentOfInterest[]
  >(mockContentOfInterests);

  const recognizer = initRecognizer(
    speechKey,
    speechRegion,
    (result: string) => {
      setMessages((messages) => [...messages, result]);
    }
  );

  const startRecording = () => {
    recognizer.startContinuousRecognitionAsync();
    showLoadingNotification(
      "voice-recognizer",
      "Started voice recognizer",
      "Speak now and see your messages appear below",
      "success"
    );
    setStart(true);
  };

  const stopRecording = () => {
    recognizer.stopContinuousRecognitionAsync();
    updateLoadingNotification(
      "voice-recognizer",
      "Stopped voice recognizer",
      "Speech will no longer be recognized and added to the messages below",
      "danger"
    );
    setStart(false);
  };

  const summarizeMessages = async () => {
    const id = "summarize-messages";
    showLoadingNotificationForAiProcessing(id);
    try {
      const res = await axios.post(summarizeMessagesUrl, {
        messages: messages(),
        userInterests: mockUserInterests,
      });
      setSummaryResults(res.data as string);
      updateLoadingNotificationForSuccessfulJob(id);
    } catch (err) {
      updateLoadingNotificationForFailedJob(id);
      console.error(err);
    }
  };

  const analyzeMessagesForFurtherActions = async () => {
    const id = "analyze-messages";
    showLoadingNotificationForAiProcessing(id);
    try {
      const res = await axios.post(analyzeMessagesUrl, {
        messages: messages(),
      });
      res.data.show = true;
      setAnalyzeMessagesResult(res.data as AnalyzeMessagesResult);
      updateLoadingNotificationForSuccessfulJob(id);
    } catch (err) {
      updateLoadingNotificationForFailedJob(id);
      console.error(err);
    }
  };

  const detectScamsAndShadyContent = async () => {
    const id = "detect-scams";
    showLoadingNotificationForAiProcessing(id);
    try {
      const res = await axios.post(identifyScamsUrl, { messages: messages() });
      setScamDetectionRes(res.data as ScamDetectionResult);
      updateLoadingNotificationForSuccessfulJob(id);
      onScamDetectionModalOpen();
    } catch (err) {
      updateLoadingNotificationForFailedJob(id);
      console.error(err);
    }
  };

  const extractTasks = async () => {
    const id = "extract-tasks";
    showLoadingNotificationForAiProcessing(id);
    try {
      const res = await axios.post(identifyTasksUrl, {
        messages: messages(),
      });
      setTasksDetectionRes((prev) => [...prev, ...(res.data as Task[])]);
      updateLoadingNotificationForSuccessfulJob(id);
    } catch (err) {
      updateLoadingNotificationForFailedJob(id);
      console.error(err);
    }
  };

  const extractMeetings = async () => {
    const id = "extract-meetings";
    showLoadingNotificationForAiProcessing(id);
    try {
      const res = await axios.post(identifyMeetingsUrl, {
        messages: messages(),
      });
      setMeetingsDetectionRes((prev) => [...prev, ...(res.data as Meeting[])]);
      updateLoadingNotificationForSuccessfulJob(id);
    } catch (err) {
      updateLoadingNotificationForFailedJob(id);
      console.error(err);
    }
  };

  const extractContentOfInterests = async (topicsOfInterest: string[]) => {
    const id = "extract-content-of-interests";
    showLoadingNotificationForAiProcessing(id);
    try {
      const res = await axios.post(identifyContentOfInterestUrl, {
        messages: messages(),
        topicsOfInterest: topicsOfInterest,
      });
      const newContent = res.data as ContentOfInterest[];
      const existingKeys = new Set(
        contentOfInterests.map((c) => c.topicOfInterest)
      );
      const filteredContent = newContent.filter(
        (content) => !existingKeys.has(content.topicOfInterest)
      );
      setContentOfInterests((prev) => [...prev, ...filteredContent]);
      updateLoadingNotificationForSuccessfulJob(id);
    } catch (err) {
      updateLoadingNotificationForFailedJob(id);
      console.error(err);
    }
  };

  const saveCallInfo = () => {
    // axios
    //   .post(completionUrl, { prompt: JSON.stringify(prompt) })
    //   .then((res) => {
    //     console.log(res.data);
    //     let detection: Detection = res.data;
    //     setIsScam(detection.isScam);
    //     setWarnings(detection.suspiciousContent);
    //   })
    //   .catch(console.warn);
  };

  const clearMessagesAndReset = () => {
    setMessages([]);
    setAnalyzeMessagesResult(defaultAnalyzeMessagesResult);
    setScamDetectionRes(defaultScamDetectionResult);
    setTasksDetectionRes([]);
    setMeetingsDetectionRes([]);
    setContentOfInterests([]);
  };

  return (
    <>
      <Show when={user() !== null} fallback={<Box>User not logged in</Box>}>
        <Box>
          User {user()?.userId} with details = {user()?.userDetails} is logged
          in
        </Box>
      </Show>
      <Center mb="$6" flex={"auto"} flexDirection="column">
        <Heading size={"xl"}>Supercharge your calls</Heading>
        <Text size={"lg"}>Gain more insights</Text>
      </Center>

      <MessagesStore start={start()} messages={messages()} />

      <Flex my="$6" justifyContent="space-evenly" wrap="wrap" rowGap="$5">
        <Show
          when={start()}
          fallback={
            <Button size={"sm"} colorScheme="primary" onClick={startRecording}>
              Start Recording
            </Button>
          }
        >
          <Button size={"sm"} colorScheme="danger" onClick={stopRecording}>
            End Recording
          </Button>
        </Show>
        <ActionsMenu
          summarizeMessages={summarizeMessages}
          analyzeMessagesForFurtherActions={analyzeMessagesForFurtherActions}
          detectScamsAndShadyContent={detectScamsAndShadyContent}
          extractTasks={extractTasks}
          extractMeetings={extractMeetings}
        />
      </Flex>

      <VStack spacing="$6">
        <AnalyzeMessagesResultCard results={analyzeMessagesResult} />
        <SummarizeMessagesCard summary={summaryResults} />
        <TasksCard tasksResults={tasksDetectionRes} />
        <MeetingsCard meetingsResults={meetingsDetectionRes} />
        <Show when={contentOfInterests.length > 0}>
          <For each={contentOfInterests}>
            {(content) => <ContentOfInterestCard contentOfInterest={content} />}
          </For>
        </Show>
      </VStack>

      <Flex my="$6" justifyContent="space-evenly" wrap="wrap" rowGap="$5">
        <Button size={"sm"} colorScheme="primary" onClick={saveCallInfo}>
          Save Call
        </Button>
        <Button
          size={"sm"}
          colorScheme="danger"
          onClick={clearMessagesAndReset}
        >
          Clear Messages
        </Button>
      </Flex>

      <ScamDetectionResultsModal
        isOpen={isScamDetectionModalOpen}
        onOpen={onScamDetectionModalOpen}
        onClose={onScamDetectionModalClose}
        scamDetectionRes={scamDetectionRes}
      />
    </>
  );
}
