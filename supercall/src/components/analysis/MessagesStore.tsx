import { Box } from "@hope-ui/solid";
import { Show, For } from "solid-js";

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
            <Box
              mb="$4"
              py="$2"
              px="$4"
              outline="solid"
              rounded="$sm"
              _last={{ mb: 0 }}
              class="first:mt-0 px-2 py-1 my-3 text-indigo-500 rounded-lg"
            >
              {message}
            </Box>
          )}
        </For>
      </Show>
    </Box>
  );
}
