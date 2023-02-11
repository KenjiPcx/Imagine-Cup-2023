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
import { createEffect, createSignal, For, lazy, Show } from "solid-js";
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
  mockMeetings,
  mockMessages2,
  mockMessages3,
  mockScamDetectionResult,
  mockSummary,
  mockTaskResult,
  mockUserInterests,
} from "../scripts/mockData";
import {
  AnalyzeMessagesResult,
  ContentOfInterest,
  Meeting,
  ScamDetectionResult,
  Task,
} from "../scripts/types";
import ContentOfInterestCard from "../components/analysis/ContentOfInterestCard";
import ScamDetectionResultsModal from "../components/analysis/ScamDetectionResultsModal";

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
  const [start, setStart] = createSignal(false);
  const [messages, setMessages] = createSignal<string[]>(mockMessages3);
  const [analyzeMessagesResult, setAnalyzeMessagesResult] = createSignal(
    mockAnalyzeMessagesResult
  );
  const [summaryResults, setSummaryResults] = createSignal("");
  const [meetingsDetectionRes, setMeetingsDetectionRes] =
    createStore<Meeting[]>(mockMeetings);
  const [tasksDetectionRes, setTasksDetectionRes] =
    createStore<Task[]>(mockTaskResult);
  const [scamDetectionRes, setScamDetectionRes] =
    createStore<ScamDetectionResult>(mockScamDetectionResult);
  const {
    isOpen: isScamDetectionModalOpen,
    onOpen: onScamDetectionModalOpen,
    onClose: onScamDetectionModalClose,
  } = createDisclosure();
  const [contentOfInterests, setContentOfInterests] = createStore<
    ContentOfInterest[]
  >(mockContentOfInterests);

  createEffect(() => console.log(summaryResults()));

  const recognizer = initRecognizer(
    speechKey,
    speechRegion,
    (result: string) => {
      setMessages((messages) => [...messages, result]);
    }
  );

  const startRecording = () => {
    recognizer.startContinuousRecognitionAsync();
    setStart(true);
  };

  const stopRecording = () => {
    recognizer.stopContinuousRecognitionAsync();
    setStart(false);
  };

  const summarizeMessages = async () => {
    console.log("Called summarize messages");
    try {
      const res = await axios.post(summarizeMessagesUrl, {
        messages: messages(),
        userInterests: mockUserInterests,
      });
      console.log(res.data);
      setSummaryResults(res.data as string);
    } catch (err) {
      console.log("error", err);
    }
  };

  const analyzeMessagesForFurtherActions = async () => {
    console.log("Called analyze messages");
    try {
      const res = await axios.post(analyzeMessagesUrl, {
        messages: messages(),
      });
      res.data.show = true;
      setAnalyzeMessagesResult(res.data as AnalyzeMessagesResult);
    } catch (err) {
      console.log("error", err);
    }
  };

  const detectScamsAndShadyContent = async () => {
    console.log("Called detect scams and shady content");
    try {
      const res = await axios.post(identifyScamsUrl, { messages: messages() });
      setScamDetectionRes(res.data as ScamDetectionResult);
      onScamDetectionModalOpen();
    } catch (err) {
      console.error(err);
    }
  };

  const extractTasks = async () => {
    console.log("Called extract tasks");
    try {
      const res = await axios.post(identifyTasksUrl, {
        messages: messages(),
      });
      setTasksDetectionRes(res.data as Task[]);
    } catch (err) {
      console.warn(err);
    }
  };

  const extractMeetings = async () => {
    console.log("Called extract meetings");
    try {
      const res = await axios.post(identifyMeetingsUrl, {
        messages: messages(),
      });
      setMeetingsDetectionRes(res.data as Meeting[]);
    } catch (err) {
      console.warn(err);
    }
  };

  const extractContentOfInterests = async (topicsOfInterest: string[]) => {
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
    } catch (err) {
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
