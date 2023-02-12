import { Box, Flex, Heading, Text } from "@hope-ui/solid";
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
          <Flex
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
            h="60vh"
            p="$2"
          >
            <Heading>No messages yet</Heading>
            <Text>Start a recording!</Text>
          </Flex>
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
