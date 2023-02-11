import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Heading,
  Text,
  Box,
} from "@hope-ui/solid";
import { For, Show } from "solid-js";
import { ScamDetectionResult, ShadyWarning } from "../../scripts/types";
import MessageBox from "./MessageBox";
import ShadyWarningBox from "./ShadyWarningBox";

interface ScamDetectionResultsModalProps {
  isOpen: () => boolean;
  onOpen: () => void;
  onClose: () => void;
  scamDetectionRes: ScamDetectionResult;
}
export default function ScamDetectionResultsModal(
  props: ScamDetectionResultsModalProps
) {
  return (
    <Modal opened={props.isOpen()} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent w="90%">
        <ModalCloseButton />
        <ModalHeader>Scam Detection Results</ModalHeader>
        <ModalBody>
          <Show
            when={props.scamDetectionRes.isScam}
            fallback={
              <Box>
                <Heading>No shady content detected</Heading>
                <Text>We did not find anything wrong with the call</Text>
              </Box>
            }
          >
            <Box mb="$6">
              <Heading fontSize={"$lg"}>⚠️ Scam Detected</Heading>
              <Text>We detected some shady content within these messages</Text>
            </Box>

            <Box mb="$6">
              <Heading fontSize={"$lg"} mb="$2">
                🏳️ Shady Content:
              </Heading>
              <For each={props.scamDetectionRes.warnings}>
                {(content) => (
                  <ShadyWarningBox shadyWarning={content as ShadyWarning} />
                )}
              </For>
            </Box>

            <Box mb="$2">
              <Heading fontSize={"$lg"} mb="$2">
                ⏭️ What to do next?
              </Heading>
              <MessageBox message={props.scamDetectionRes.advice} />
            </Box>
          </Show>
        </ModalBody>
        <ModalFooter>
          <Button mx={"auto"} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
