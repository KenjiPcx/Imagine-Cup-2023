import { Button, Flex } from "@hope-ui/solid";
import { Show, For, Accessor } from "solid-js";
import { AnalyzeMessagesResult } from "../../scripts/types";
import AnalysisCard from "./AnalysisCard";
import MessageBox from "./MessageBox";

interface AnalyzeMessagesResultCardProps {
  results: Accessor<AnalyzeMessagesResult>;
  extractTasks: () => Promise<void>;
  extractMeetings: () => Promise<void>;
  extractContentOfInterests: (topic: string[]) => Promise<void>;
}

export default function AnalyzeMessagesResultCard(
  props: AnalyzeMessagesResultCardProps
) {
  const generateAnalyzeMessagesResultMessage = () => {
    let msg = "From the messages, ";
    if (
      !props.results().hasTasksOrPotentialTasks &&
      !props.results().hasBookingsOrAppointments &&
      props.results().topicsOfInterestsFound.length === 0
    ) {
      msg += "we found nothing to extract 🥲🥲🥲";
      return msg;
    }

    msg +=
      "we found these things to extract 😀😀😀. Click on the buttons below 👇to start extracting!";
    return msg;
  };

  return (
    <Show when={props.results().show}>
      <AnalysisCard heading="Analyze Message Results">
        <MessageBox
          message={generateAnalyzeMessagesResultMessage()}
          alignment="center"
        />
        <Flex
          my="$6"
          flexWrap="wrap"
          gap="$4"
          m="0"
          alignContent="center"
          justifyContent="center"
        >
          <Show when={props.results().hasTasksOrPotentialTasks}>
            <Button
              size={"sm"}
              colorScheme="success"
              onClick={props.extractTasks}
            >
              Tasks
            </Button>
          </Show>
          <Show when={props.results().hasBookingsOrAppointments}>
            <Button
              size={"sm"}
              colorScheme="success"
              onClick={props.extractMeetings}
            >
              Meetings
            </Button>
          </Show>
          <Show when={props.results().topicsOfInterestsFound.length > 0}>
            <For
              each={props
                .results()
                .topicsOfInterestsFound.sort((a, b) => a.length - b.length)}
            >
              {(topic) => {
                return (
                  <Button
                    size={"sm"}
                    colorScheme="accent"
                    onClick={() => props.extractContentOfInterests([topic])}
                  >
                    {topic}
                  </Button>
                );
              }}
            </For>
          </Show>
        </Flex>
      </AnalysisCard>
    </Show>
  );
}
