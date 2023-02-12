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
import { Accessor, createSignal, Show } from "solid-js";
import { customExtractionUrl } from "../../constants";
import {
  showLoadingNotificationForAiProcessing,
  updateLoadingNotificationForSuccessfulJob,
  updateLoadingNotificationForFailedJob,
} from "../../scripts/notificationServiceHelper";
import MessageBox from "./MessageBox";

interface CustomExtractionModalProps {
  isOpen: () => boolean;
  onOpen: () => void;
  onClose: () => void;
  messages: Accessor<string[]>;
}

export default function CustomExtractionModal(
  props: CustomExtractionModalProps
) {
  let promptInput: any;
  const [extractionRes, setExtractionRes] = createSignal("");

  const customExtraction = async () => {
    if (promptInput.value === "") return;

    const id = "custom-extraction";
    showLoadingNotificationForAiProcessing(id);
    try {
      const res = await axios.post(customExtractionUrl, {
        messages: props.messages(),
        userPrompt: promptInput.value,
      });
      updateLoadingNotificationForSuccessfulJob(id);
      setExtractionRes(res.data);
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
        <ModalHeader>Ask Questions Using GPT</ModalHeader>
        <ModalBody>
          <Box mb="$3">
            <Heading>Ask me anything about the conversation</Heading>
          </Box>
          <FormControl mb="$3">
            <FormLabel>Enter your prompt:</FormLabel>
            <Input
              ref={promptInput}
              placeholder="Was the conversation a nice talk?"
            />
          </FormControl>
          <Show when={extractionRes() !== ""}>
            <MessageBox message={extractionRes()} />
          </Show>
        </ModalBody>
        <ModalFooter>
          <Flex w="$full" justifyContent={"space-evenly"}>
            <Button colorScheme={"danger"} onClick={props.onClose}>
              Cancel
            </Button>

            <Button colorScheme={"success"} onClick={customExtraction}>
              Extract
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
