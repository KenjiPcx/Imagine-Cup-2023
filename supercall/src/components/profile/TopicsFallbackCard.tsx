import { Flex, Spinner, Heading } from "@hope-ui/solid";

export default function TopicsFallbackCard() {
  return (
    <Flex
      my="$16"
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="$neutral4"
        color="$info10"
        size="xl"
      />
      <Heading mt="$4">Loading topics of interests...</Heading>
    </Flex>
  );
}
