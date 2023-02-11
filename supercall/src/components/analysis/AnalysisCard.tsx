import { Box, Heading } from "@hope-ui/solid";
import { JSX } from "solid-js";

interface AnalysisCardProps {
  heading: string;
  children: JSX.Element;
}

export default function AnalysisCard(props: AnalysisCardProps) {
  return (
    <Box p="$4" bgColor="$neutral6" rounded="$sm" w="$full">
      <Heading size="lg" mb="$3" textAlign="center">
        {props.heading}
      </Heading>
      {props.children}
    </Box>
  );
}
