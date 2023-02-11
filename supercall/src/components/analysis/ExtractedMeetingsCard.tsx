import AnalysisCard from "./AnalysisCard";
import type { Meeting } from "../../scripts/types";
import { Accessor, For, Show } from "solid-js";
import MessageBox from "./MessageBox";
import TaskBox from "./TaskBox";
import MeetingBox from "./MeetingBox";

interface ExtractedMeetingsCardProps {
  meetingsResults: Meeting[];
  show: Accessor<boolean>;
}

export default function ExtractedMeetingsCard(
  props: ExtractedMeetingsCardProps
) {
  return (
    <Show when={props.show()}>
      <AnalysisCard heading="Extracted Meetings">
        <For each={props.meetingsResults}>
          {(meeting) => <MeetingBox meeting={meeting} />}
        </For>
      </AnalysisCard>
    </Show>
  );
}
