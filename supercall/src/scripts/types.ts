export type CallInfo = {
  summary: string;
  tasks?: Task[];
  meetings?: Meeting[];
  contentOfInterests?: ContentOfInterest[];
  timestamp: number;
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

export type Meeting = {
  title: string;
  details?: string;
  participants?: string;
  date?: string;
  time?: string;
  location?: string;
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

export type CallItem = {
  id: string;
  summary: string;
  userId: string;
  tasksId?: string;
  meetingsId?: string;
  contentOfInterestsId?: string;
  timestamp: number;
};
