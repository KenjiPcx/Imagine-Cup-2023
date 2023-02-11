import { Box } from "@hope-ui/solid";
import { Show, For } from "solid-js";
import type { Warning } from "../../scripts/types";

interface AnalysisResultsProps {
  isScam: boolean;
  warnings: Warning[];
}

export default function (props: AnalysisResultsProps) {
  return (
    <>
      <Box class="outline-dashed mx-3 p-4" bgColor={"palevioletred"}>
        <Show
          when={props.isScam}
          fallback={
            <Box>
              <h1 class="font-bold text-lg text-green-500">
                We don't find anything suspicious about this call
              </h1>
            </Box>
          }
        >
          <h1 class="font-bold text-lg text-red-500 text-center">
            We think that this is a scam
          </h1>
          <ul class="mt-2 flex flex-col gap-4">
            <For each={props.warnings}>
              {(warning) => (
                <li class="p-2 outline rounded-xl">
                  <Box class="mb-2">
                    <h3 class="font-bold">Suspicious sentence:</h3>
                    {warning.text}
                  </Box>
                  <Box>
                    <h3 class="font-bold">Rationale:</h3>
                    {warning.reason}
                  </Box>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </Box>
    </>
  );
}
