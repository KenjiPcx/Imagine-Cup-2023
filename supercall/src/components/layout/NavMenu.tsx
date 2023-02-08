import {
  Menu,
  MenuTrigger,
  IconButton,
  MenuContent,
  MenuItem,
} from "@hope-ui/solid";
import { FiMenu } from "solid-icons/fi";

export default function NavMenu() {
  return (
    <Menu>
      <MenuTrigger
        as={IconButton}
        variant="outline"
        colorScheme="neutral"
        icon={<FiMenu />}
      />
      <MenuContent minW="$60">
        <MenuItem icon={<FiMenu />} command="⌘T">
          New Tab
        </MenuItem>
        <MenuItem icon={<FiMenu />} command="⌘N">
          New Window
        </MenuItem>
        <MenuItem icon={<FiMenu />} command="⌘⇧N">
          Open Closed Tab
        </MenuItem>
        <MenuItem icon={<FiMenu />} command="⌘O">
          Open File...
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
