import { Box } from "@hope-ui/solid";

interface MessageBoxProps {
  message: string;
  alignment: "left" | "right" | "center";
}

export default function MessageBox(props: MessageBoxProps) {
  return (
    <Box
      mb="$4"
      py="$2"
      px="$4"
      rounded="$sm"
      h="fit-content"
      textAlign={props.alignment}
      bgColor="$info8"
      _last={{ mb: 0 }}
    >
      {props.message}
    </Box>
  );
}
