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
  show: boolean;
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
    action: string;
    reason: string;
  }[];
};

export type TasksDetectionResult = {
  tasks: Task[];
};

export type Meeting = {
  title: string;
  details?: string;
  participants?: string;
  date?: string;
  time?: string;
  location?: string;
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
  topic: string;
  content: string[];
};

export type ShadyWarning = {
  text: string;
  reason: string;
};

export type ScamDetectionResult = {
  isScam: boolean;
  warnings: ShadyWarning[];
  advice: string;
};

export type clientPrincipal = {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
  claims: {
    typ: string;
    val: string;
  }[];
};
