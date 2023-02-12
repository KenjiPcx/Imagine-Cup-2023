import { Avatar, Box, Heading } from "@hope-ui/solid";
import { clientPrincipal } from "../../scripts/types";

interface AuthorizedUserCardProps {
  user: () => clientPrincipal | null;
}

export default function AuthorizedUserCard(props: AuthorizedUserCardProps) {
  return (
    <>
      <Avatar
        size={"2xl"}
        name={props.user()?.userDetails || "Default Username"}
        src="broken-link"
      />
      <Box
        bgColor={"$info8"}
        px="$3"
        py="$2"
        rounded={"$md"}
        w="85%"
        textAlign={"center"}
      >
        <Heading size={"lg"} mt="$2">
          UserId: {props.user()?.userId}
        </Heading>
        <Heading size={"lg"} my="$2">
          Username: {props.user()?.userDetails}
        </Heading>
      </Box>
    </>
  );
}
