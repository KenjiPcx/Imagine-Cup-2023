import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@hope-ui/solid";
import { Accessor } from "solid-js";

interface RemoveTopicModalProps {
  isOpen: () => boolean;
  onOpen: () => void;
  onClose: () => void;
  topicToRemove: Accessor<string>;
  removeTopic: () => void;
}

export default function RemoveTopicModal(props: RemoveTopicModalProps) {
  return (
    <Modal size={"xs"} opened={props.isOpen()} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Remove topic</ModalHeader>
        <ModalBody>
          <p>
            Are you sure you want to remove topic "{props.topicToRemove()}"?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            mr="$4"
            size={"sm"}
            colorScheme="danger"
            onClick={props.onClose}
          >
            Cancel
          </Button>
          <Button size={"sm"} colorScheme="success" onClick={props.removeTopic}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
