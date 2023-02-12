import { Box, Heading, ListItem, UnorderedList } from "@hope-ui/solid";
import { For } from "solid-js";
import { Task } from "../../scripts/types";

interface TaskInfoCardProps {
  task: Task;
  alignment?: "left" | "right" | "center";
  bgColor?: string;
}

export default function TaskInfoCard(props: TaskInfoCardProps) {
  return (
    <Box
      mb="$4"
      py="$2"
      px="$4"
      rounded="$sm"
      h="fit-content"
      textAlign={props.alignment || "left"}
      bgColor={props.bgColor || "$info8"}
      _last={{ mb: 0 }}
    >
      <Heading textAlign={"center"} mb="$3">
        {props.task.goal}
      </Heading>
      <UnorderedList>
        <For each={props.task.subtasks}>
          {(subtask: { action: string; reason: string }) => (
            <ListItem>
              {subtask.action} - {subtask.reason}
            </ListItem>
          )}
        </For>
      </UnorderedList>
    </Box>
  );
}
