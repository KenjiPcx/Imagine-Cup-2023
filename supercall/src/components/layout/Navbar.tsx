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
import { Link } from "@solidjs/router";
import { FiMenu } from "solid-icons/fi";
import { createResource, Show } from "solid-js";
import { loginUrl, logoutUrl } from "../../constants";
import { getUserInfo } from "../../scripts/auth";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = createDisclosure();
  const [user] = createResource(getUserInfo);

  return (
    <>
      <Flex w="$full" p="$3" alignItems="center">
        <Box>
          <Anchor href="/">
            <Heading size="xl" fontWeight="$bold" pl="$2">
              SuperCall
            </Heading>
          </Anchor>
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
              <Anchor as={Link} href="/">
                Analyze Call
              </Anchor>
              <Anchor as={Link} href="/about">
                About
              </Anchor>
              <Anchor as={Link} href="/profile">
                Profile
              </Anchor>
              <Anchor as={Link} href="/call-history">
                Call History
              </Anchor>
              <Heading flex={1} mt="$4" fontWeight="$medium" textAlign="start">
                Productivity
              </Heading>
              <Anchor as={Link} href="/tasks">
                Tasks
              </Anchor>
              <Anchor as={Link} href="/meetings">
                Meetings
              </Anchor>
              <Anchor as={Link} href="/brain-dump">
                Interests Brain Dump
              </Anchor>
              <Anchor as={Link} href="/mental-notes">
                Mental Notes
              </Anchor>
            </nav>
            <Box mb="$4">
              <Show
                when={user() === null}
                fallback={
                  <Anchor href={logoutUrl}>
                    <Button mr="$3">Logout</Button>
                  </Anchor>
                }
              >
                <Anchor href={loginUrl}>
                  <Button mr="$3">Login</Button>
                </Anchor>
              </Show>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
