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
            colorScheme="danger"
            onSelect={props.detectScamsAndShadyContent}
          >
            Detect Scams/Shady content
          </MenuItem>
          <MenuItem
            colorScheme="accent"
            onSelect={props.analyzeMessagesForFurtherActions}
          >
            Analyze Messages For Further Actions
          </MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
