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
import { Link, useNavigate } from "@solidjs/router";
import { FiMenu } from "solid-icons/fi";
import { createResource, Show } from "solid-js";
import { loginUrl, logoutUrl } from "../../constants";
import { getUserInfo } from "../../scripts/auth";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = createDisclosure();
  const [user] = createResource(getUserInfo);
  const navigate = useNavigate();
  const login = () => {
    navigate(loginUrl);
  };
  const logout = () => {
    navigate(logoutUrl);
  };

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
                  <Button mr="$3" onClick={login}>
                    Logout
                  </Button>
                }
              >
                <Button mr="$3" onClick={logout}>
                  Login
                </Button>
              </Show>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
