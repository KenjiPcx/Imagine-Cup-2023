import { Box } from "@hope-ui/solid";
import { Show, For } from "solid-js";

interface MessagesStoreProps {
  start: boolean;
  messages: string[];
}

export default function (props: MessagesStoreProps) {
  return (
    <Box minH="62.5vh" overflow="scroll" bgColor="rebeccapurple">
      <Show
        when={props.start || props.messages.length > 0}
        fallback={
          <div class="flex flex-col justify-center items-center h-full p-4 text-center">
            <p>No messages yet</p>
            <p>Start a recording!</p>
          </div>
        }
      >
        <For each={props.messages}>
          {(message: string) => (
            <div class="first:mt-0 px-2 py-1 my-3 outline text-indigo-500 rounded-lg">
              {message}
            </div>
          )}
        </For>
      </Show>
    </Box>
  );
}
