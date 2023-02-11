import { Accessor, createSignal, For, onMount, Show } from "solid-js";
import AnalysisCard from "./AnalysisCard";
import MessageBox from "./MessageBox";

interface SummarizeMessagesCardProps {
  summary: Accessor<string>;
}

export default function SummarizeMessagesCard(
  props: SummarizeMessagesCardProps
) {
  const [paragraphs, setParagraphs] = createSignal<string[]>([]);
  onMount(() => {
    const newParagraphs = props
      .summary()
      .split("\n")
      .filter((p) => p !== "");
    setParagraphs(newParagraphs);
  });

  return (
    <Show when={props.summary() !== ""}>
      <AnalysisCard heading="Summary of Messages">
        <For each={paragraphs()}>
          {(paragraph) => <MessageBox message={paragraph} alignment="left" />}
        </For>
      </AnalysisCard>
    </Show>
  );
}
