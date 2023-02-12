import { Box, Heading, ListItem, UnorderedList } from "@hope-ui/solid";
import { For } from "solid-js";
import { ContentOfInterest } from "../../scripts/types";

interface ContentOfInterestInfoCardProps {
  contentOfInterest: ContentOfInterest;
  alignment?: "left" | "right" | "center";
  bgColor?: string;
}

export default function ContentOfInterestInfoCard(
  props: ContentOfInterestInfoCardProps
) {
  return (
    <Box
      mb="$4"
      py="$2"
      px="$4"
      rounded="$sm"
      h="fit-content"
      w="$full"
      textAlign={props.alignment || "left"}
      bgColor={props.bgColor || "$info8"}
      _last={{ mb: 0 }}
    >
      <Heading textAlign={"center"} mb="$3">
        {props.contentOfInterest.topic}
      </Heading>
      <UnorderedList>
        <For each={props.contentOfInterest.content}>
          {(content) => <ListItem>{content}</ListItem>}
        </For>
      </UnorderedList>
    </Box>
  );
}
