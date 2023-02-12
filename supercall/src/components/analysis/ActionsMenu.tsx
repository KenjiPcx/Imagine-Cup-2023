import {
  Menu,
  MenuTrigger,
  Button,
  MenuContent,
  MenuItem,
  Icon,
  MenuGroup,
  MenuLabel,
} from "@hope-ui/solid";
import { AiOutlineDown } from "solid-icons/ai";

interface ActionsMenuProps {
  summarizeMessages: () => void;
  analyzeMessagesForFurtherActions: () => void;
  detectScamsAndShadyContent: () => void;
  extractTasks: () => void;
  extractMeetings: () => void;
  openCustomExtractionModal: () => void;
}

export default function ActionsMenu(props: ActionsMenuProps) {
  return (
    <Menu>
      <MenuTrigger
        as={Button}
        colorScheme="accent"
        size="sm"
        rightIcon={<Icon as={AiOutlineDown} boxSize="$3" />}
      >
        Chat Actions
      </MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuLabel>Actions</MenuLabel>
          <MenuItem colorScheme="info" onSelect={props.summarizeMessages}>
            Summarize Messages
          </MenuItem>
          <MenuItem colorScheme="primary" onSelect={props.extractTasks}>
            Extract Tasks/Goals/Todos
          </MenuItem>
          <MenuItem colorScheme="success" onSelect={props.extractMeetings}>
            Extract Bookings/Appointments
          </MenuItem>
          <MenuItem
            colorScheme="warning"
            onSelect={props.detectScamsAndShadyContent}
          >
            Detect Scams/Shady content
          </MenuItem>
          <MenuItem
            colorScheme="accent"
            onSelect={props.analyzeMessagesForFurtherActions}
          >
            Analyze For Interests
          </MenuItem>
          <MenuItem
            colorScheme="neutral"
            onSelect={props.openCustomExtractionModal}
          >
            Open GPT interface
          </MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
