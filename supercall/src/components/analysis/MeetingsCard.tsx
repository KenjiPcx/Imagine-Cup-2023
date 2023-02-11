import AnalysisCard from "./AnalysisCard";
import type { Meeting } from "../../scripts/types";
import { For, Show } from "solid-js";
import MeetingBox from "./MeetingBox";

interface MeetingsCardProps {
  meetingsResults: Meeting[];
}

export default function MeetingsCard(props: MeetingsCardProps) {
  return (
    <Show when={props.meetingsResults.length > 0}>
      <AnalysisCard heading="Extracted Meetings">
        <For each={props.meetingsResults}>
          {(meeting) => <MeetingBox meeting={meeting} />}
        </For>
      </AnalysisCard>
    </Show>
  );
}
