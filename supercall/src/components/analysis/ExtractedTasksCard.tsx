import AnalysisCard from "./AnalysisCard";
import type { Task } from "../../scripts/types";
import { Accessor, For, Show } from "solid-js";
import MessageBox from "./MessageBox";

interface ExtractedTasksCardProps {
  tasksResults: Task[];
  show: Accessor<boolean>;
}

export default function ExtractedTasksCard(props: ExtractedTasksCardProps) {
  return (
    <Show when={props.show()}>
      <AnalysisCard heading="Extracted Tasks">
        <For each={props.tasksResults}>
          {(task) => <MessageBox message={task.goal} alignment="left" />}
        </For>
      </AnalysisCard>
    </Show>
  );
}
