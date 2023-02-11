import { Box, Heading, Text } from "@hope-ui/solid";
import { ShadyWarning } from "../../scripts/types";

interface ShadyWarningBoxProps {
  shadyWarning: ShadyWarning;
}

export default function ShadyWarningBox(props: ShadyWarningBoxProps) {
  return (
    <Box
      mb="$4"
      py="$3"
      px="$4"
      rounded="$sm"
      h="fit-content"
      bgColor="$info8"
      _last={{ mb: 0 }}
    >
      <Heading fontWeight={"$bold"}>Suspicous sentence:</Heading>
      <Text size="lg" p="$2" opacity="0.9">
        <strong>
          <em>"{props.shadyWarning.text}"</em>
        </strong>
      </Text>
      <Heading mt="$3">Why it is suspicious?</Heading>
      <Text>{props.shadyWarning.reason}</Text>
    </Box>
  );
}
