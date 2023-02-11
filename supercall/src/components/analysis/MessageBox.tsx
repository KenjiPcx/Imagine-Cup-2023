import { Box } from "@hope-ui/solid";
import { Property } from "@stitches/core/types/css";
import { JSXElement } from "solid-js";

interface MessageBoxProps {
  message: string;
  alignment?: "left" | "right" | "center";
  children?: JSXElement;
  bgColor?: Property.BackgroundColor;
}

export default function MessageBox(props: MessageBoxProps) {
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
      {props.message}
      {props.children}
    </Box>
  );
}
