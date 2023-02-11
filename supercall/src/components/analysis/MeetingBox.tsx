import { Box, Text } from "@hope-ui/solid";
import { Show } from "solid-js";
import { Meeting } from "../../scripts/types";

interface MeetingBoxProps {
  meeting: Meeting;
}

export default function MeetingBox(props: MeetingBoxProps) {
  return (
    <Box
      mb="$4"
      py="$2"
      px="$4"
      rounded="$sm"
      h="fit-content"
      bgColor="$info8"
      _last={{ mb: 0 }}
    >
      <Text fontWeight="bold" fontSize={"xl"}>
        {props.meeting.title}
      </Text>
      <Show when={props.meeting.details}>
        <Text>Details: {props.meeting.details}</Text>
      </Show>
      <Show when={props.meeting.participants}>
        <Text>Who: {props.meeting.participants}</Text>
      </Show>
      <Show when={props.meeting.date || props.meeting.time}>
        <Text>
          When:
          <Show when={props.meeting.date}>{props.meeting.date}</Show>
          <Show when={props.meeting.time}>{props.meeting.time}</Show>
        </Text>
      </Show>
      <Show when={props.meeting.location}>
        <Text>Where: {props.meeting.location}</Text>
      </Show>
    </Box>
  );
}
