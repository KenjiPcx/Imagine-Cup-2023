import {
  Meeting,
  ContentOfInterest,
  ShadyWarning,
  Task,
  AnalyzeMessagesResult,
  ScamDetectionResult,
} from "./types";

export const mockMessages = [
  "The criminal case registered under your name for tax fraud and tax evasion and there is also a warrant out for your rest. Now there's a warrant out for my arrest this let it go there online there I have to play this regarding the Goat House. So we don't need any instruction this call sorry this is gonna get played in court. Yeah recording is going to be playing the Gold Souls found out on miscalculation of 1693 pounds outstanding under your name. So at this point of time you have only two options. Your first option is to go to court and fight the case in case if you.",
  "You have to pay a penalty fine of £19,000 and embracement of two year and if you want to resolve the matter outside of the courthouse then you have to pay the outstanding amount which is £1693.00 to the government. If Sonic was not your intention to defraud the HMRC then this whole money is going to be refunded back to you whether you want to do you want to go to court or you want to pay and resolve the matter.",
];

export const mockMessages2 = [
  `The criminal case registered under your name for tax fraud and tax evasion and there is also a warrant out for your rest. Now there's a warrant out for my arrest this let it go there online there I have to play this regarding the Goat House. So we don't need any instruction this call sorry this is gonna get played in court. Yeah recording is going to be playing the Gold Souls found out on miscalculation of 1693 pounds outstanding under your name.`,
  `Hey, have you read any good books lately? Yes, I just finished "The Immortal Life of Henrietta Lacks." It's a fascinating read. I've been meaning to check that one out.`,
  `What's it about? It's a non-fiction book about a woman named Henrietta Lacks, whose cancer cells were taken without her knowledge or consent and used for scientific research. It's a really eye-opening look at the ethics of medical research and the impact it has on people's lives. Yeah, I've heard a lot of great things about that book.`,
  // `What about you? I just finished "The Nightingale." It's a historical fiction novel set during World War II in France. It's a really moving story about two sisters and their experiences during the war. That sounds interesting.`,
  // `I'll have to check that out. Definitely. So, what's on your mind today? I was thinking about visiting some new places. I need a break from the usual routine. Me too! I'm in.`,
  // `Where are you thinking of going? I was thinking of going to Japan. What do you think? Japan sounds amazing! I've always wanted to visit there. How long is the trip? It's a two-week trip.`,
  // `Two weeks? That's a long time. Do you have the details of the trip? Yeah, I do. I've been doing some research, and I think we should book a package that includes everything from the flights to the accommodation.`,
];

export const mockSummary: string = "lorem ipsum dolor sit amet \n hello";

export const mockAnalyzeMessagesResult: AnalyzeMessagesResult = {
  show: true,
  hasTasksOrPotentialTasks: true,
  hasBookingsOrAppointments: true,
  topicsOfInterestsFound: ["books to read", "places to visit"],
};

export const mockTaskResult: Task[] = [
  {
    goal: "Booke a trip to Japan",
    subtasks: [
      {
        action: "Research area",
        reason: "Get the most out of money",
      },
      {
        action: "Make slides",
        reason: "Nice",
      },
    ],
  },
  {
    goal: "Read henriata",
    subtasks: [
      {
        action: "Find insights",
        reason: "Be bettery",
      },
      {
        action: "Make slides",
        reason: "Share to fiends",
      },
    ],
  },
];

export const mockMeetings: Meeting[] = [
  {
    title: "Run in park",
    date: "new Date(),",
    time: "new Date(),",
    location: "park",
    participants: "kn and je",
  },
  {
    title: "Joji concert",
    date: "new Date(),",
    time: "new Date(),",
    location: "park",
    participants: "kn and je",
  },
];

export const mockContentOfInterests: ContentOfInterest[] = [
  {
    topic: "Anime to watch",
    content: ["my hero", "gibiate", "gleipnir"],
  },
  {
    topic: "World affairs",
    content: ["Malaysia growth 8%", "Andrew tate arrewsted", "Fifa world cup"],
  },
];

export const mockWarnings: ShadyWarning[] = [
  {
    text: "criminal case registered under your name for tax fraud and tax evasion and there is also a warrant out for your rest",
    reason:
      "The caller is claiming that there is a criminal case registered under the person's name for tax fraud and tax evasion and there is a warrant out for their arrest, which is likely a scam.",
  },
  {
    text: "pay a penalty fine of £19,000 and embracement of two year",
    reason:
      "The caller is asking the person to pay a penalty fine of £19,000 and embracement of two year, which is likely a scam.",
  },
  {
    text: "pay the outstanding amount which is £1693.00 to the government",
    reason:
      "The caller is asking the person to pay the outstanding amount of £1693.00 to the government, which is likely a scam.",
  },
];

export const mockScamDetectionResult: ScamDetectionResult = {
  isScam: true,
  warnings: mockWarnings,
  advice: "Drop the call",
};

export const mockUserInterests: string[] = [
  "movies to watch",
  "books to read",
  "places to visit",
  "life affairs and updates of friends",
];

export const mockMessages3 = [
  `Hey have you heard about our boy Richard? I heard he got a new job at this big tech company, must be swimming in cash now right? No, I have not, congrats to him, we should meet up with him soon`,
  `Yea, did you remember Richard used to be so studious, it really paid off for him, he did recommend me these books to read before, such as the book atomic habits, a lifechanging book according to him and Life 3.0 by Max Tegmark, we should start reading if we want to be like him`,
  // `What's it about? One is about building habit systems and another is about possible futures with AI, very interesting books overall. I prefer something visual instead, got any recommendations? Oh, I saw this AI documentary on Google the other day, Robert downey junior was the presenter, he's like iron man in real life.`,
  "Let's contact richard and have lunch together! I'll do it when I am back, and try to book the post restaurant we always used to go to, its time for a reunion and a celebration, let's do some planning for this as well",
  "I heard you went on a trip recently where and how was it? Ah, it was Japan, it is fantastic, we should go sometime soon, yeah lets set up a meeting next week to discuss more about this how about 5pm on Microsoft Teams? Yea sounds good, I got to go, see you soon bye!",
  // `What about you? I just finished "The Nightingale." It's a historical fiction novel set during World War II in France. It's a really moving story about two sisters and their experiences during the war. That sounds interesting.`,
  // `I'll have to check that out. Definitely. So, what's on your mind today? I was thinking about visiting some new places. I need a break from the usual routine. Me too! I'm in.`,
  // `Where are you thinking of going? I was thinking of going to Japan. What do you think? Japan sounds amazing! I've always wanted to visit there. How long is the trip? It's a two-week trip.`,
  // `Two weeks? That's a long time. Do you have the details of the trip? Yeah, I do. I've been doing some research, and I think we should book a package that includes everything from the flights to the accommodation.`,
];

export const mockUser = {
  userDetails: "kenjipcx",
  userRoles: ["test"],
  identityProvider: "test",
  userId: "f62009ecfc354c1499137b8347884940",
  claims: [],
};

export const mockMessages4 = [
  "Have you heard about this new app called SuperCall? It's amazing!",
  "It extracts important information from your conversations, like tasks, meetings, and even topics that interest you. I used it to extract a list of action items from our team call yesterday. It saved me so much time!",
  "Wow, that sounds really useful. I always forget the important details after a call.",
  "Yeah, me too. And the best part is, you can even use the GPT terminal feature to ask questions about the conversation. It's like having your own personal assistant.",
];
