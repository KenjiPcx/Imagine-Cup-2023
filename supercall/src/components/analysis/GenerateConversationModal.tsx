import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Flex,
  Box,
} from "@hope-ui/solid";
import axios from "axios";
import { Setter } from "solid-js";
import { generateConversationUrl } from "../../constants";
import {
  showLoadingNotificationForAiProcessing,
  updateLoadingNotificationForSuccessfulJob,
  updateLoadingNotificationForFailedJob,
} from "../../scripts/notificationServiceHelper";

interface GenerateConversationModalProps {
  isOpen: () => boolean;
  onOpen: () => void;
  onClose: () => void;
  setMessages: Setter<string[]>;
}

export default function GenerateConversationModal(
  props: GenerateConversationModalProps
) {
  let promptInput: any;

  const GenerateConversation = async () => {
    if (promptInput.value === "") return;

    const id = "generate-conversation";
    showLoadingNotificationForAiProcessing(id);
    try {
      const res = await axios.post(generateConversationUrl, {
        userPrompt: promptInput.value,
      });
      console.log(res.data)
      props.setMessages([res.data] as string[]);
      updateLoadingNotificationForSuccessfulJob(id);
      props.onClose();
    } catch (err) {
      updateLoadingNotificationForFailedJob(id);
      console.error(err);
    }
  };

  return (
    <Modal
      size="xs"
      blockScrollOnMount={false}
      opened={props.isOpen()}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Generate a conversation to demo</ModalHeader>
        <ModalBody>
          <Box mb="$3">
            <Heading>
              Ask GPT to generate a conversation with any topics and
              instructions
            </Heading>
          </Box>
          <FormControl mb="$3">
            <FormLabel>Enter your prompt:</FormLabel>
            <Input
              ref={promptInput}
              placeholder="Have 2 people talk about the learning to code"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Flex w="$full" justifyContent={"space-evenly"}>
            <Button colorScheme={"danger"} onClick={props.onClose}>
              Cancel
            </Button>

            <Button colorScheme={"success"} onClick={GenerateConversation}>
              Extract
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
