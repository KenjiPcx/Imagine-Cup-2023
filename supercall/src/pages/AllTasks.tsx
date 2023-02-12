import { Center, Heading, Flex, Text, Spinner } from "@hope-ui/solid";
import axios from "axios";
import { Show, For, createSignal, createResource, Suspense } from "solid-js";
import TaskInfoCard from "../components/productivity/TaskInfoCard";
import { getAllTasksUrl } from "../constants";
import { mockUser } from "../scripts/mockData";
import { clientPrincipal, Task } from "../scripts/types";

const fetchTasksForUser = async (user: clientPrincipal | null) => {
  console.log("called");
  if (!user) {
    console.log("Not logger id");
    return [];
  }
  const res = await axios.post(getAllTasksUrl, {
    userId: user.userId,
  });
  console.log(res.data);

  return res.data as Task[];
};

export default function AllTasks() {
  // const [user] = createResource(getUserInfo);
  const [user, setUser] = createSignal(mockUser);
  const [tasks] = createResource(user(), fetchTasksForUser);

  return (
    <>
      <Center mb="$6" flex={"auto"} flexDirection="column">
        <Heading size={"xl"}>Tasks</Heading>
        <Text size={"lg"}>Keep up the grind! 💪</Text>
      </Center>

      <Flex
        minH="62.5vh"
        overflow="scroll"
        p="$4"
        bgColor="$neutral6"
        rounded="$sm"
      >
        <Suspense
          fallback={
            <Center w="$full">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="$neutral4"
                color="$info10"
                size="xl"
              />
            </Center>
          }
        >
          <Show
            when={tasks() && tasks()!.length > 0}
            fallback={<Center w="$full">No tasks found</Center>}
          >
            <Flex flexDirection={"column"}>
              <For each={tasks()}>
                {(task: Task) => <TaskInfoCard task={task} />}
              </For>
            </Flex>
          </Show>
        </Suspense>
      </Flex>
    </>
  );
}
