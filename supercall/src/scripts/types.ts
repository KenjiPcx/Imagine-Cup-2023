export type CallInfo = {
  id: string;
  detected: AnalyzeMessagesResult;
  summary: string;
  scams?: ScamsDetectionResult;
  tasks?: TasksDetectionResult;
  meetings?: MeetingsDetectionResult;
  interestingContent?: InterestingContentExtractionResult[];
  timestamp: Date;
};

export type AnalyzeMessagesResult = {
  hasTasksOrPotentialTasks: boolean;
  hasBookingsOrAppointments: boolean;
  topicsOfInterestsFound: string[];
};

export type ScamsDetectionResult = {
  content: { text: string; reason: string }[];
  action: string;
};

export type Task = {
  goal: string;
  subtasks: {
    subtask: string;
    reason: string;
  }[];
};

export type TasksDetectionResult = {
  tasks: Task[];
};

export type Meeting = {
  title: string;
  reasonToMeet: string;
  participants: string;
  datetime: Date;
  location: string;
};

export type MeetingsDetectionResult = {
  meetings: Meeting[];
};

export type Topic = {
  topic: string;
  content: string[];
};

export type InterestingContentExtractionResult = {
  topics: Topic[];
};

export type SummarizeResult = {
  summary: string;
};

export type ContentOfInterest = {
  topicOfInterest: string;
  content: string[];
};
