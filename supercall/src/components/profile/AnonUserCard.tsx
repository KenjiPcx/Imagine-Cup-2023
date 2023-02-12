import {
  Avatar,
  Box,
  Heading,
  UnorderedList,
  ListItem,
  Anchor,
  Button,
  Icon,
} from "@hope-ui/solid";
import { AiOutlineGithub } from "solid-icons/ai";
import { loginUrl } from "../../constants";
import MessageBox from "../analysis/MessageBox";

export default function AnonUserCard() {
  return (
    <>
      <Avatar size={"2xl"} name="U" src="broken-link" />
      <Box w={"80%"}>
        <MessageBox message={"You need to login to view your profile"}>
          <Heading mt="$2">Loging in will also allow you to</Heading>
          <UnorderedList>
            <ListItem>Add Personalization</ListItem>
            <ListItem>Save Calls</ListItem>
            <ListItem>View Call History</ListItem>
            <ListItem>Access your personal knowledge dump bank</ListItem>
          </UnorderedList>
        </MessageBox>
      </Box>
      <Anchor href={loginUrl}>
        <Button colorScheme={"info"}>
          <Icon as={AiOutlineGithub} mr="$2" boxSize="$6" />
          Login with GitHub
        </Button>
      </Anchor>
    </>
  );
}
