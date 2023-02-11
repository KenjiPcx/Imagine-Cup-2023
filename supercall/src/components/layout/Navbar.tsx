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
import { getUserInfo } from "../../scripts/auth";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = createDisclosure();
  const [user] = createResource(getUserInfo);

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
              <Anchor as={Link} href="/">
                Analyze Call
              </Anchor>
              <Anchor as={Link} href="/about">
                About
              </Anchor>
              <Anchor as={Link} href="/call-history">
                Call History
              </Anchor>
              <Anchor as={Link} href="/profile">
                Profile
              </Anchor>
            </nav>
            <Box mb="$4">
              <Show
                when={user() === null}
                fallback={
                  <Anchor
                    as={Button}
                    mr="$3"
                    href="/.auth/logout?post_logout_redirect_uri=https://thankful-mushroom-0de6c9303.2.azurestaticapps.net/"
                  >
                    Logout
                  </Anchor>
                }
              >
                <Anchor
                  as={Button}
                  mr="$3"
                  href="/.auth/login/github?post_login_redirect_uri=https://thankful-mushroom-0de6c9303.2.azurestaticapps.net/"
                >
                  Login
                </Anchor>
              </Show>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
