import { Box, ListItem, UnorderedList, Text } from "@hope-ui/solid";
import { For, JSXElement } from "solid-js";
import { Task } from "../../scripts/types";

interface TaskBoxProps {
  task: Task;
  children?: JSXElement;
}

export default function TaskBox(props: TaskBoxProps) {
  return (
    <Box
      mb="$4"
      py="$2"
      px="$4"
      rounded="$sm"
      h="fit-content"
      bgColor="$info8"
      _last={{ mb: 0 }}
    >
      <Text fontWeight="bold" fontSize={"xl"}>
        {props.task.goal}
      </Text>
      <UnorderedList>
        <For each={props.task.subtasks}>
          {(subtask) => (
            <ListItem>
              <Box>
                <Text>{subtask.action}</Text>
                <Text size={"sm"} opacity="0.9">
                  ({subtask.reason})
                </Text>
              </Box>
            </ListItem>
          )}
        </For>
      </UnorderedList>
    </Box>
  );
}
