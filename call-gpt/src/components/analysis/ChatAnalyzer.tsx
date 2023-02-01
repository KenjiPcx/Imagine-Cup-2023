import axios from "axios";
import { createSignal, For, Show } from "solid-js";
import { initRecognizer } from "../../scripts/azureAiHelpers";
import { generateAnalyzeMessagesPrompt } from "../../scripts/openAiHelper";
interface ChatAnalyzerProps {
  speechKey: string;
  speechRegion: string;
}

type Warning = {
  text: string;
  reason: string;
};

type Detection = {
  scam: boolean;
  suspicious_content: {
    text: string;
    reason: string;
  }[];
};

const messages1 = [
  "I have no idea mate.",
  "The criminal case registered under your name for tax fraud and tax evasion and there is also a warrant out for your rest. Now there's a warrant out for my arrest this let it go there online there I have to play this regarding the Goat House. So we don't need any instruction this call sorry this is gonna get played in court. Yeah recording is going to be playing the Gold Souls found out on miscalculation of 1693 pounds outstanding under your name. So at this point of time you have only two options. Your first option is to go to court and fight the case in case if you.",
  "You have to pay a penalty fine of £19,000 and embracement of two year and if you want to resolve the matter outside of the courthouse then you have to pay the outstanding amount which is £1693.00 to the government. If Sonic was not your intention to defraud the HMRC then this whole money is going to be refunded back to you whether you want to do you want to go to court or you want to pay and resolve the matter.",
];

const warnings1 = [
  {
    text: "criminal case registered under your name for tax fraud and tax evasion and there is also a warrant out for your rest",
    reason:
      "The caller is claiming that there is a criminal case registered under the person's name for tax fraud and tax evasion and there is a warrant out for their arrest, which is likely a scam.",
  },
  {
    text: "pay a penalty fine of £19,000 and embracement of two year",
    reason:
      "The caller is asking the person to pay a penalty fine of £19,000 and embracement of two year, which is likely a scam.",
  },
  {
    text: "pay the outstanding amount which is £1693.00 to the government",
    reason:
      "The caller is asking the person to pay the outstanding amount of £1693.00 to the government, which is likely a scam.",
  },
];

const completionUrl = "http://localhost:7071/api/completion";

export default function ChatAnalyzer(props: ChatAnalyzerProps) {
  const [start, setStart] = createSignal(false);
  const [messages, setMessages] = createSignal<string[]>(messages1);
  const [isScam, setIsScam] = createSignal(true);
  const [warnings, setWarnings] = createSignal<Warning[]>(warnings1);

  const recognizer = initRecognizer(
    props.speechKey,
    props.speechRegion,
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

  const analyzeMessages = () => {
    let prompt = generateAnalyzeMessagesPrompt(messages());
    console.log("Analyzed messages");
    axios
      .post(completionUrl, { prompt: JSON.stringify(prompt) })
      .then((res) => {
        console.log(res.data);
        let detection: Detection = res.data;
        setIsScam(detection.scam);
        setWarnings(detection.suspicious_content);
      })
      .catch(console.warn);
  };

  return (
    <>
      <div class="outline-dashed mx-3 p-4 h-2/3 overflow-scroll">
        <Show
          when={start() || messages().length > 0}
          fallback={
            <div class="flex flex-col justify-center items-center h-full p-4 text-center">
              <p>No messages yet</p>
              <p>Start a recording!</p>
            </div>
          }
        >
          <For each={messages()}>
            {(message: string) => (
              <div class="first:mt-0 px-2 py-1 my-3 outline text-indigo-500 rounded-lg">
                {message}
              </div>
            )}
          </For>
        </Show>
      </div>
      <div class="flex justify-center">
        <Show
          when={start()}
          fallback={
            <button
              onClick={startRecording}
              class="outline w-fit my-auto py-1 px-3 rounded-3xl text-sm text-green-500 mt-6 mx-auto"
            >
              Start Recording
            </button>
          }
        >
          <button
            onClick={stopRecording}
            class="outline w-fit my-auto py-1 px-3 rounded-3xl text-sm text-red-500 mt-6 mx-auto"
          >
            End Recording
          </button>
        </Show>
        <button
          onClick={analyzeMessages}
          class="outline w-fit my-auto py-1 px-3 rounded-3xl text-sm text-amber-500 mt-6 mx-auto"
        >
          Analyze Messages
        </button>
      </div>
      <Show when={isScam()}>
        <h1 class="font-bold text-lg text-red-500">Scam detected</h1>
        <h2 class="font-bold text-lg">Warnings</h2>
        <div class="flex flex-col">
          <For each={warnings()}>
            {(warning: Warning) => (
              <li class="p-2">
                <h1>{warning.text}</h1>
                <p>{warning.reason}</p>
              </li>
            )}
          </For>
        </div>
      </Show>
    </>
  );
}
