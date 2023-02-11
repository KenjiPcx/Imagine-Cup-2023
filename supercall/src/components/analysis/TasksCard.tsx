import AnalysisCard from "./AnalysisCard";
import type { Task } from "../../scripts/types";
import { For, Show } from "solid-js";
import TaskBox from "./TaskBox";

interface TasksCardProps {
  tasksResults: Task[];
}

export default function TasksCard(props: TasksCardProps) {
  return (
    <Show when={props.tasksResults.length > 0}>
      <AnalysisCard heading="Extracted Tasks">
        <For each={props.tasksResults}>{(task) => <TaskBox task={task} />}</For>
      </AnalysisCard>
    </Show>
  );
}
