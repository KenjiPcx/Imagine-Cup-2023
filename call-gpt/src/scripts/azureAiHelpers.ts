import * as speechSdk from "microsoft-cognitiveservices-speech-sdk";

export function initRecognizer(
  speechKey: string,
  speechRegion: string,
  callback: (recognizedText: string) => void
) {
  console.warn("Called initRecognizer");
  const speechConfig = speechSdk.SpeechConfig.fromSubscription(
    speechKey,
    speechRegion
  );
  speechConfig.speechRecognitionLanguage = "en-US";
  const audioConfig = speechSdk.AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new speechSdk.SpeechRecognizer(speechConfig, audioConfig);

  recognizer.recognizing = (s, e) => {
    console.log(`RECOGNIZING: Text=${e.result.text}`);
  };

  recognizer.recognized = (s, e) => {
    if (e.result.reason == speechSdk.ResultReason.RecognizedSpeech) {
      console.log(`RECOGNIZED: Text=${e.result.text}`);
      callback(e.result.text);
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
}

export const initConversationTranscriber = (
  speechKey: string,
  speechRegion: string,
  voiceString: string,
  callback: (recognizedText: string, speaker: string) => void
) => {
  console.warn("Called initConversationTranscriber");

  let speechTranslationConfig =
    speechSdk.SpeechTranslationConfig.fromSubscription(speechKey, speechRegion);
  let audioConfig = speechSdk.AudioConfig.fromDefaultMicrophoneInput();
  speechTranslationConfig.setProperty(
    "ConversationTranscriptionInRoomAndOnline",
    "true"
  );
  speechTranslationConfig.speechRecognitionLanguage = "en-US";

  let conversation = speechSdk.Conversation.createConversationAsync(
    speechTranslationConfig,
    "myConversation"
  );
  let transcriber = new speechSdk.ConversationTranscriber(audioConfig);

  transcriber.joinConversationAsync(
    conversation,
    () => {
      console.log("hello");
      let user1 = speechSdk.Participant.From("Kenji", "en-us", voiceString);
      conversation.addParticipantAsync(
        user1,
        () => {
          transcriber.sessionStarted = (s, e) => {
            console.log("(sessionStarted)");
          };
          transcriber.sessionStopped = (s, e) => {
            console.log("(sessionStopped)");
          };
          transcriber.canceled = (s, e) => {
            console.log("(canceled)");
          };
          transcriber.transcribed = (s, e) => {
            console.log("(transcribed) text" + e.result.text);
            console.log("(transcribed) speakerId" + e.result.speakerId);
            callback(e.result.text, e.result.speakerId);
          };
          console.log("Done setting up");
        },
        (err) => {
          console.trace("err - adding user1: " + err);
        }
      );
    },
    (err) => {
      console.trace("err - joining conversation: " + err);
    }
  );

  return transcriber;
};
