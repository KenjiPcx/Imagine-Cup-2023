import { Box, Heading, ListItem, UnorderedList } from "@hope-ui/solid";
import { Show } from "solid-js";
import { Meeting } from "../../scripts/types";

interface MeetingInfoCardProps {
  meeting: Meeting;
  alignment?: "left" | "right" | "center";
  bgColor?: string;
}

export default function MeetingInfoCard(props: MeetingInfoCardProps) {
  return (
    <Box
      mb="$4"
      py="$2"
      px="$4"
      rounded="$sm"
      h="fit-content"
      textAlign={props.alignment || "left"}
      bgColor={props.bgColor || "$info8"}
      _last={{ mb: 0 }}
    >
      <Heading textAlign={"center"} mb="$3">
        {props.meeting.title}
      </Heading>
      <UnorderedList>
        <Heading>Description:</Heading>
        <ListItem>{props.meeting.details}</ListItem>
        <Show when={props.meeting.location}>
          <Heading mt="$2">Location:</Heading>
          <ListItem>{props.meeting.location}</ListItem>
        </Show>
        <Show when={props.meeting.date && props.meeting.time}>
          <Heading mt="$2">Time:</Heading>
          <ListItem>
            {props.meeting.date} - {props.meeting.time}
          </ListItem>
        </Show>
        <Show when={props.meeting.participants}>
          <Heading mt="$2">ParticipantsInvolved</Heading>
          <ListItem>{props.meeting.participants}</ListItem>
        </Show>
      </UnorderedList>
    </Box>
  );
}
