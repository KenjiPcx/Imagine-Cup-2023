import { createSignal, For, Show } from "solid-js";
import * as speechSdk from "microsoft-cognitiveservices-speech-sdk";

interface ChatAnalyzerProps {
  speechKey: string;
  speechRegion: string;
}

export default function ChatAnalyzer(props: ChatAnalyzerProps) {
  const [start, setStart] = createSignal(false);
  const [messages, setMessages] = createSignal<string[]>([]);

  const initRecognizer = () => {
    console.warn("Called initRecognizer");
    const speechConfig = speechSdk.SpeechConfig.fromSubscription(
      props.speechKey,
      props.speechRegion
    );
    speechConfig.speechRecognitionLanguage = "en-US";
    const audioConfig = speechSdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechSdk.SpeechRecognizer(
      speechConfig,
      audioConfig
    );

    recognizer.recognizing = (s, e) => {
      console.log(`RECOGNIZING: Text=${e.result.text}`);
    };

    recognizer.recognized = (s, e) => {
      if (e.result.reason == speechSdk.ResultReason.RecognizedSpeech) {
        console.log(`RECOGNIZED: Text=${e.result.text}`);
        setMessages((messages) => [...messages, e.result.text]);
      } else if (e.result.reason == speechSdk.ResultReason.NoMatch) {
        console.log("NOMATCH: Speech could not be recognized.");
      }
    };

    recognizer.canceled = (s, e) => {
      console.log(`CANCELED: Reason=${e.reason}`);
      if (e.reason == speechSdk.CancellationReason.Error) {
        console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
        console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
        console.log(
          "CANCELED: Did you set the speech resource key and region values?"
        );
      }
      recognizer.stopContinuousRecognitionAsync();
    };

    recognizer.sessionStopped = (s, e) => {
      console.log("\n    Session stopped event.");
      recognizer.stopContinuousRecognitionAsync();
    };

    return recognizer;
  };

  const recognizer = initRecognizer();

  const startRecording = () => {
    recognizer.startContinuousRecognitionAsync();
    setStart(true);
  };

  const stopRecording = () => {
    recognizer.stopContinuousRecognitionAsync();
    setStart(false);
  };

  return (
    <>
      <div class="outline-dashed mx-3 p-4 h-2/3 overflow-scroll">
        <Show
          when={start()}
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
      </div>
    </>
  );
}
