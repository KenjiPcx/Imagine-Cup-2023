import { Box, Flex, IconButton } from "@hope-ui/solid";
import { IoRemoveCircle } from "solid-icons/io";
import MessageBox from "../analysis/MessageBox";

interface TopicsBoxProps {
  topic: string;
  openTopicRemovalModal: (topic: string) => void;
}

export default function TopicsBox(props: TopicsBoxProps) {
  return (
    <Box position="relative" w="95.5%" mb="$6">
      <MessageBox message={props.topic}>
        <Flex
          ml="$4"
          alignItems={"center"}
          position="absolute"
          right="0"
          top="50%"
          transform={"translateX(50%) translateY(-50%)"}
        >
          <IconButton
            aria-label={`remove ${props.topic}`}
            icon={<IoRemoveCircle />}
            colorScheme={"danger"}
            rounded="$3xl"
            onClick={() => props.openTopicRemovalModal(props.topic)}
            size="sm"
          />
        </Flex>
      </MessageBox>
    </Box>
  );
}
