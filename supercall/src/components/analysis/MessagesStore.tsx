import { Box, Button } from "@hope-ui/solid";
import { Show, For } from "solid-js";
import MessageBox from "./MessageBox";

interface MessagesStoreProps {
  start: boolean;
  messages: string[];
}

export default function (props: MessagesStoreProps) {
  return (
    <Box
      minH="62.5vh"
      overflow="scroll"
      p="$4"
      bgColor="$neutral6"
      rounded="$sm"
    >
      <Show
        when={props.start || props.messages.length > 0}
        fallback={
          <Box class="flex flex-col justify-center items-center h-full p-4 text-center">
            <p>No messages yet</p>
            <p>Start a recording!</p>
          </Box>
        }
      >
        <For each={props.messages}>
          {(message: string) => (
            <MessageBox message={message} alignment="left" />
          )}
        </For>
      </Show>
    </Box>
  );
}
