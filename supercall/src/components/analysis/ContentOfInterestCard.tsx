import { For } from "solid-js";
import { ContentOfInterest } from "../../scripts/types";
import AnalysisCard from "./AnalysisCard";
import MessageBox from "./MessageBox";

interface ContentOfInterestsCardProps {
  contentOfInterest: ContentOfInterest;
}

export default function ContentOfInterestCard(
  props: ContentOfInterestsCardProps
) {
  return (
    <AnalysisCard
      heading={`Extracted ${props.contentOfInterest.topic}`}
    >
      <For each={props.contentOfInterest.content}>
        {(content) => <MessageBox message={content} alignment="left" />}
      </For>
    </AnalysisCard>
  );
}
