import axios from "axios";
import { createSignal, For, Show } from "solid-js";
import { initRecognizer } from "../../scripts/azureAiHelpers";
import { generateAnalyzeMessagesPrompt } from "../../scripts/openAiHelper";
import { mockMessages, mockWarnings } from "../../scripts/mockData";
import type { Detection, Warning } from "../../scripts/types";
import AnalysisResults from "./AnalysisResults";
import MessagesStore from "./MessagesStore";
import { Box, Button, Flex } from "@hope-ui/solid";

const speechKey = import.meta.env.VITE_SPEECH_KEY as string;
const speechRegion = import.meta.env.VITE_SPEECH_REGION as string;

export default function ChatAnalyzer() {
  const [start, setStart] = createSignal(false);
  const [messages, setMessages] = createSignal<string[]>(mockMessages);
  const [isScam, setIsScam] = createSignal(true);
  const [warnings, setWarnings] = createSignal<Warning[]>(mockWarnings);
  const [showScamModal, setShowScamModal] = createSignal(true);

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

  const analyzeMessagesForScams = () => {
    let prompt = generateAnalyzeMessagesPrompt(messages());
    console.log("Analyzed messages");
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

  <div class="w-full flex justify-center mt-5">
    <button class="outline w-fit my-auto py-1 px-3 rounded-3xl text-sm text-blue-500 mx-auto">
      Save Call
    </button>
  </div>;

  return (
    <Box>
      <MessagesStore start={start()} messages={messages()} />

      <Flex my="$6" justifyContent="space-evenly">
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
        <Button
          size={"sm"}
          colorScheme="accent"
          onClick={analyzeMessagesForScams}
        >
          Analyze Messages
        </Button>
      </Flex>
      {/* <AnalysisResults isScam={isScam()} warnings={warnings()} /> */}
    </Box>
  );
}
