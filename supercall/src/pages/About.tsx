import {
  Box,
  Center,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@hope-ui/solid";
import MessageBox from "../components/analysis/MessageBox";

export default function About() {
  return (
    <>
      <Center mb="$6" flex={"auto"} flexDirection="column">
        <Heading size={"xl"}>Supercall FAQ</Heading>
        <Text size={"lg"}>We help extract insights from calls</Text>
      </Center>

      <Box p="$4" bgColor="$neutral6" rounded="$sm">
        <MessageBox message="What is Supercall?">
          <Text mt="$2" opacity={"90%"}>
            Supercall ia a productivity tool that uses AI and natural language
            processing (NLP) to help you gain insights from your phone calls or
            conversations.
          </Text>
        </MessageBox>
        <MessageBox message="What can you do with Supercall?">
          <Text mt="$2" opacity={"90%"}>
            Supercall has buttons to extract the common insights we usually want
            from our conversations
          </Text>
          <Heading mt="$2">Features Include:</Heading>
          <UnorderedList opacity={"90%"}>
            <ListItem>Summarizing conversation</ListItem>
            <ListItem>Indentifting tasks</ListItem>
            <ListItem>Identifying meeting appointments</ListItem>
            <ListItem>
              Identifying content which aligns to your topic of interests
            </ListItem>
            <ListItem>Checking if call is a scam</ListItem>
          </UnorderedList>
        </MessageBox>

        <MessageBox message="Why use Supercall?">
          <Text my="$2">
            We communicate with each other on a daily basis, but we don't have
            the memory to remember every little thing we said in detail
          </Text>
          <Text mb="$2">
            There is a lot of untapped insights from our conversations that we
            just forget after talking, it is not persistent, using supercall
            helps record this and helps us to extract insights quickly
          </Text>
          <Text>
            Businesses have this feature on for their meetings and it has shown
            to be quite useful for taking notes, so why not for our personal
            calls?
          </Text>
        </MessageBox>

        <MessageBox message="Who is Supercall for?">
          <Text my="$2">
            It is a productivity tool that everyone can use to help them be more
            efficient
          </Text>
          <Heading mt="$2">It could be quite useful for:</Heading>
          <UnorderedList opacity={"90%"}>
            <ListItem>People with poor memory</ListItem>
            <ListItem>People with poor attention spans</ListItem>
            <ListItem>
              Elderly who find it difficult to identify scam calls
            </ListItem>
          </UnorderedList>
        </MessageBox>
        <MessageBox message="When to use Supercall?">
          <UnorderedList mt="$2" opacity={"90%"}>
            <ListItem>When taking a call</ListItem>
            <ListItem>When talking to friends</ListItem>
            <ListItem>When doing business calls or meetings</ListItem>
          </UnorderedList>
        </MessageBox>
        <MessageBox message="Where to use Supercall?">
          <Text mt="$2">
            Anywhere with low background noise and good internet connection
          </Text>
        </MessageBox>
        <MessageBox message="What's next for Supercall?">
          <Text mt="$2">
            We are looking to implement these features in the future
          </Text>
          <UnorderedList opacity={"90%"}>
            <ListItem>Speaker identification and diarization</ListItem>
            <ListItem>Integration with other productivity apps</ListItem>
            <ListItem>More personalization</ListItem>
          </UnorderedList>
        </MessageBox>
      </Box>
    </>
  );
}
