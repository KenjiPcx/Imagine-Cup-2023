import {
  AnalyzeMessagesResult,
  ContentOfInterest,
  Meeting,
  Task,
} from "./types";

export const DefaultAnalyzeMessagesResult: AnalyzeMessagesResult = {
  hasTasksOrPotentialTasks: true,
  hasBookingsOrAppointments: true,
  topicsOfInterestsFound: [
    "topic 1 test with long words",
    "microsoft",
    "topic 2",
    "abc",
  ],
};

export const DefaultTaskResult: Task[] = [
  {
    goal: "Booke a trip to Japan",
    subtasks: [
      {
        subtask: "Research area",
        reason: "Get the most out of money",
      },
      {
        subtask: "Make slides",
        reason: "Nice",
      },
    ],
  },
  {
    goal: "Read henriata",
    subtasks: [
      {
        subtask: "Find insights",
        reason: "Be bettery",
      },
      {
        subtask: "Make slides",
        reason: "Share to fiends",
      },
    ],
  },
];

export const DefaultMeetings: Meeting[] = [
  {
    title: "Run in park",
    datetime: new Date(),
    location: "park",
    reasonToMeet: "run in park",
    participants: "kn and je",
  },
  {
    title: "Joji concert",
    datetime: new Date(),
    location: "park",
    reasonToMeet: "run in park",
    participants: "kn and je",
  },
];

export const DefaultContentOfInterests: ContentOfInterest[] = [
  {
    topicOfInterest: "Anime to watch",
    content: ["my hero", "gibiate", "gleipnir"],
  },
  {
    topicOfInterest: "World affairs",
    content: ["Malaysia growth 8%", "Andrew tate arrewsted", "Fifa world cup"],
  },
];
