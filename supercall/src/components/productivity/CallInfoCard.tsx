import { Box, Heading } from "@hope-ui/solid";
import { CallItem } from "../../scripts/types";
import MessageBox from "../analysis/MessageBox";

interface CallInfoCardProps {
  call: CallItem;
}

export default function CallInfoCard(props: CallInfoCardProps) {
  console.log(Date.now());
  return (
    <Box mb="$3">
      <Heading textAlign={"center"} mb="$3">
        {new Date(props.call.timestamp).toLocaleString()}
      </Heading>
      <MessageBox message={props.call.summary} />
    </Box>
  );
}
