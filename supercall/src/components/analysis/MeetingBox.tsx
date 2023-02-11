import { Box, Text } from "@hope-ui/solid";
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
      <Text>Who: {props.meeting.participants}</Text>
      <Text>Where: {props.meeting.location}</Text>
      <Text>Why: {props.meeting.reasonToMeet}</Text>
      <Text>
        When: <time>{props.meeting.datetime.toUTCString()}</time>
      </Text>
    </Box>
  );
}
