import { Button, Center, Flex, Heading, Text, VStack } from "@hope-ui/solid";
import axios from "axios";
import { createEffect, createSignal, For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import ActionsMenu from "../components/analysis/ActionsMenu";
import AnalysisCard from "../components/analysis/AnalysisCard";
import AnalyzeMessagesResultCard from "../components/analysis/AnalyzeMessagesResultCard";
import ExtractedMeetingsCard from "../components/analysis/ExtractedMeetingsCard";
import ExtractedTasksCard from "../components/analysis/ExtractedTasksCard";
import MessagesStore from "../components/analysis/MessagesStore";
import SummarizeMessagesCard from "../components/analysis/SummarizeMessageCard";
import {
  analyzeMessagesUrl,
  identifyMeetingsUrl,
  identifyTasksUrl,
  summarizeMessagesUrl,
} from "../constants";
import { initRecognizer } from "../scripts/azureAiHelpers";
import {
  DefaultAnalyzeMessagesResult,
  DefaultMeetings,
  DefaultTaskResult,
} from "../scripts/default";
import { mockMessages, mockWarnings, mockMessages2 } from "../scripts/mockData";
import { generateAnalyzeMessagesPrompt } from "../scripts/openAiHelper";
import { AnalyzeMessagesResult, Meeting, Task } from "../scripts/types";

const speechKey = import.meta.env.VITE_SPEECH_KEY as string;
const speechRegion = import.meta.env.VITE_SPEECH_REGION as string;

export default function Home() {
  const [start, setStart] = createSignal(false);
  const [messages, setMessages] = createSignal<string[]>(mockMessages2);

  const [showAnalyzeMessageResults, setShowAnalyzeMessageResults] =
    createSignal(true);
  const [analyzeMessagesResult, setAnalyzeMessagesResult] = createSignal(
    DefaultAnalyzeMessagesResult
  );
  const [showSummaryResults, setShowSummaryResults] = createSignal(true);
  const [summaryResults, setSummaryResults] = createSignal(
    "lorem ipsum dolor sit amet \n hello"
  );
  const [showMeetingDetection, setShowMeetingDetection] = createSignal(true);
  const [meetingsDetectionRes, setMeetingsDetectionRes] =
    createStore<Meeting[]>(DefaultMeetings);
  const [showTasksDetection, setShowTasksDetection] = createSignal(true);
  const [tasksDetectionRes, setTasksDetectionRes] =
    createStore<Task[]>(DefaultTaskResult);
  const [showScamDetection, setShowScamDetection] = createSignal(true);
  const [scamDetectionRes, setScamDetectionRes] = createStore<string[]>([]);

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
      });
      setSummaryResults(res.data as string);
      setShowSummaryResults(true);
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
      setAnalyzeMessagesResult(res.data as AnalyzeMessagesResult);
      setShowAnalyzeMessageResults(true);
    } catch (err) {
      console.log("error", err);
    }
  };

  const detectScamsAndShadyContent = () => {
    console.log("Called detect scams and shady content");
    let prompt = generateAnalyzeMessagesPrompt(messages());
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

  const extractTasks = async () => {
    console.log("Called extract tasks");
    try {
      const res = await axios.post(identifyTasksUrl, {
        messages: messages(),
      });
      setTasksDetectionRes(res.data as Task[]);
      setShowTasksDetection(true);
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
      setShowMeetingDetection(true);
    } catch (err) {
      console.warn(err);
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
        <AnalyzeMessagesResultCard
          show={showAnalyzeMessageResults}
          results={analyzeMessagesResult}
        />
        <SummarizeMessagesCard
          show={showSummaryResults}
          summary={summaryResults}
        />
        <ExtractedTasksCard
          show={showTasksDetection}
          tasksResults={tasksDetectionRes}
        />
        <ExtractedMeetingsCard
          show={showMeetingDetection}
          meetingsResults={meetingsDetectionRes}
        />
        <AnalysisCard heading="Interesting content">Heki</AnalysisCard>
      </VStack>
      {/* <AnalysisResults isScam={isScam()} warnings={warnings()} /> */}
    </>
  );
}
