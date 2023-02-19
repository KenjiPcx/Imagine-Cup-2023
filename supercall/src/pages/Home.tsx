import {
  Button,
  Center,
  createDisclosure,
  Flex,
  Heading,
  Text,
  VStack,
} from "@hope-ui/solid";
import axios from "axios";
import { createResource, createSignal, For, lazy, Show } from "solid-js";
import { createStore } from "solid-js/store";
import {
  analyzeMessagesUrl,
  identifyContentOfInterestUrl,
  identifyMeetingsUrl,
  identifyScamsUrl,
  identifyTasksUrl,
  saveCallUrl,
  summarizeMessagesUrl,
} from "../constants";
import { initRecognizer } from "../scripts/azureAiHelpers";
import {
  mockAnalyzeMessagesResult,
  mockContentOfInterests,
  mockMessages3,
  mockMessages4,
  mockUserInterests,
} from "../scripts/mockData";
import {
  AnalyzeMessagesResult,
  CallInfo,
  clientPrincipal,
  ContentOfInterest,
  Meeting,
  ScamDetectionResult,
  Task,
} from "../scripts/types";

import {
  showLoadingNotification,
  showLoadingNotificationForAiProcessing,
  showNotification,
  updateLoadingNotification,
  updateLoadingNotificationForFailedJob,
  updateLoadingNotificationForSuccessfulJob,
} from "../scripts/notificationServiceHelper";
import { getUserInfo } from "../scripts/auth";
import CustomExtractionModal from "../components/analysis/CustomExtractionModal";
import GenerateConversationModal from "../components/analysis/GenerateConversationModal";

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
const ScamDetectionResultsModal = lazy(
  () => import("../components/analysis/ScamDetectionResultsModal")
);
const ContentOfInterestCard = lazy(
  () => import("../components/analysis/ContentOfInterestCard")
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
  const [messages, setMessages] = createSignal<string[]>([]);
  const [analyzeMessagesResult, setAnalyzeMessagesResult] = createSignal(
    defaultAnalyzeMessagesResult
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
  const {
    isOpen: isCustomExtractionModalOpen,
    onOpen: onCustomExtractionModalOpen,
    onClose: onCustomExtractionModalClose,
  } = createDisclosure();
  const {
    isOpen: isGenerateConversationModalOpen,
    onOpen: onGenerateConversationModalOpen,
    onClose: onGenerateConversationModalClose,
  } = createDisclosure();
  const [contentOfInterests, setContentOfInterests] = createStore<
    ContentOfInterest[]
  >([]);

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
    if (messages().length === 0) {
      showNotification(
        "No messages",
        "You need to record some messages first",
        "warning"
      );
      return;
    }

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
    if (messages().length === 0) {
      showNotification(
        "No messages",
        "You need to record some messages first",
        "warning"
      );
      return;
    }

    const id = "analyze-messages";
    showLoadingNotificationForAiProcessing(id);
    try {
      const res = await axios.post(analyzeMessagesUrl, {
        messages: messages(),
        userInterests: mockUserInterests,
      });
      res.data.show = true;
      console.log(res.data);
      setAnalyzeMessagesResult(res.data as AnalyzeMessagesResult);
      updateLoadingNotificationForSuccessfulJob(id);
    } catch (err) {
      updateLoadingNotificationForFailedJob(id);
      console.error(err);
    }
  };

  const detectScamsAndShadyContent = async () => {
    if (messages().length === 0) {
      showNotification(
        "No messages",
        "You need to record some messages first",
        "warning"
      );
      return;
    }

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
    if (messages().length === 0) {
      showNotification(
        "No messages",
        "You need to record some messages first",
        "warning"
      );
      return;
    }

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
    if (messages().length === 0) {
      showNotification(
        "No messages",
        "You need to record some messages first",
        "warning"
      );
      return;
    }

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

  const extractContentOfInterests = async (topicsOfInterests: string[]) => {
    if (messages().length === 0) {
      showNotification(
        "No messages",
        "You need to record some messages first",
        "warning"
      );
      return;
    }

    const id = `extract-content-of-interests-${topicsOfInterests.join("-")}}`;
    showLoadingNotificationForAiProcessing(id);
    try {
      const res = await axios.post(identifyContentOfInterestUrl, {
        messages: messages(),
        topicsOfInterests: topicsOfInterests,
      });
      const newContent = res.data as ContentOfInterest[];
      const existingKeys = new Set(contentOfInterests.map((c) => c.topic));
      const filteredContent = newContent.filter(
        (content) => !existingKeys.has(content.topic)
      );
      setContentOfInterests((prev) => [...prev, ...filteredContent]);
      updateLoadingNotificationForSuccessfulJob(id);
    } catch (err) {
      updateLoadingNotificationForFailedJob(id);
      console.error(err);
    }
  };

  const saveCallInfo = async () => {
    if (user() === null) {
      showNotification(
        "User is not logged in",
        "User needs to be logged in to save call info",
        "danger"
      );
      return;
    }

    const id = "save-call-info";
    showLoadingNotificationForAiProcessing(id);
    try {
      if (summaryResults() === "") {
        await summarizeMessages();
      }
      const callInfo: CallInfo = {
        summary: summaryResults(),
        tasks: tasksDetectionRes,
        meetings: meetingsDetectionRes,
        contentOfInterests: contentOfInterests,
        timestamp: Date.now(),
      };
      await axios.post(saveCallUrl, {
        userId: user()!.userId,
        callInfo: callInfo,
      });
      updateLoadingNotificationForSuccessfulJob(id);
      clearMessagesAndReset();
    } catch (err) {
      console.error(err);
      updateLoadingNotificationForFailedJob(id);
    }
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
      <Center mb="$6" flex={"auto"} flexDirection="column">
        <Heading size={"xl"}>Supercharge your convos</Heading>
        <Text size={"lg"}>Get the context you never had</Text>
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
          openCustomExtractionModal={onCustomExtractionModalOpen}
          generateConversation={onGenerateConversationModalOpen}
        />
      </Flex>

      <VStack spacing="$6" mb="$4">
        <AnalyzeMessagesResultCard
          results={analyzeMessagesResult}
          extractTasks={extractTasks}
          extractMeetings={extractMeetings}
          extractContentOfInterests={extractContentOfInterests}
        />
        <SummarizeMessagesCard summary={summaryResults} />
        <TasksCard tasksResults={tasksDetectionRes} />
        <MeetingsCard meetingsResults={meetingsDetectionRes} />
        <Show when={contentOfInterests.length > 0}>
          <For each={contentOfInterests}>
            {(content) => <ContentOfInterestCard contentOfInterest={content} />}
          </For>
        </Show>
      </VStack>

      <Flex my="$2" justifyContent="center" flexDirection="column" rowGap="$3">
        <Button
          size={"sm"}
          colorScheme="danger"
          onClick={clearMessagesAndReset}
        >
          Clear Messages
        </Button>
        <Button size={"sm"} colorScheme="success" onClick={saveCallInfo}>
          Save Conversation Details
        </Button>
      </Flex>

      <ScamDetectionResultsModal
        isOpen={isScamDetectionModalOpen}
        onOpen={onScamDetectionModalOpen}
        onClose={onScamDetectionModalClose}
        scamDetectionRes={scamDetectionRes}
      />

      <CustomExtractionModal
        isOpen={isCustomExtractionModalOpen}
        onOpen={onCustomExtractionModalOpen}
        onClose={onCustomExtractionModalClose}
        messages={messages}
      />

      <GenerateConversationModal
        isOpen={isGenerateConversationModalOpen}
        onOpen={onGenerateConversationModalOpen}
        onClose={onGenerateConversationModalClose}
        setMessages={setMessages}
      />
    </>
  );
}
