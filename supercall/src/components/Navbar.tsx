import {
  Flex,
  Box,
  Heading,
  Spacer,
  IconButton,
  createDisclosure,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Button,
  Anchor,
} from "@hope-ui/solid";
import { FiMenu } from "solid-icons/fi";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = createDisclosure();

  return (
    <>
      <Flex w="$full" p="$3" alignItems="center">
        <Box>
          <Heading size="xl" fontWeight="$bold" pl="$2">
            SuperCall
          </Heading>
        </Box>
        <Spacer />
        <IconButton
          aria-label="Menu"
          icon={<FiMenu />}
          variant="outline"
          colorScheme="neutral"
          onClick={onOpen}
        />
      </Flex>
      <Drawer opened={isOpen()} placement={"top"} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>SuperCall Menu</DrawerHeader>
          <DrawerBody>
            <nav class="flex flex-col gap-2 mb-6">
              <Anchor href="/">Analyze Call</Anchor>
              <Anchor href="/about">About</Anchor>
              <Anchor href="/call-history">Call History</Anchor>
              <Anchor href="/profile">Profile</Anchor>
            </nav>
            <Box mb="$4">
              <Button mr="$3" size="sm">
                Login
              </Button>
              <Button mr="$3" size="sm">
                Sign Up
              </Button>
              <Button mr="$3" size="sm">
                Logout
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
