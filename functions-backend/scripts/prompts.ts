export const generateAnalyzeMessagesPrompt = (
  messages: string[],
  userInterests: string[]
) => {
  return `Detect if there are any scams or shady content, tasks or potential tasks, bookings or appointments, and topics of interests in the given dialog. Return me a json object with this shape 
   {
    scamOrShadyContent: boolean;
    tasksOrPotentialTasks: boolean;
    bookingsOrAppointments: boolean;
    topicsOfInterests: string[]
   }
   Topics of interests are in this list [${userInterests.join(
     ", "
   )}], if you detect any other topics that might interest me, include them in the topics array as well.

   The dialog is as follows: ${messages.join(" ")}
`;
};

export const generateScamDetectionPrompt = (messages: string[]) => {
  return `Extract the scams and shady contents from this dialog, explain why they are, then suggest what a user should do next like how to verify the caller or just end the call etc, return a json object with this structure 
  { 
    content: {
        text: string, 
        reason: string
    }[],
    action: string 
  }

  The dialog is as follows: "${messages.join(" ")}"
`;
};

export const generateTasksDetectionPromps = (messages: string[]) => {
  return `From this dialog, extract the tasks and potential tasks, and group them with suitable labels. After that, suggest some SMART subtasks to help achieve each goal and explain if possible. Return the tasks in a json object with this structure 
    {
        tasks: {
            task: {
                action: string
                subtasks: {
                    action: string
                    reason: string
                }[]
            }
            group: string
        }[]
    }
    
    The dialog is as follows: "${messages.join(" ")}"`;
};

export const generateMeetingsDetectionPrompt = (messages: string[]) => {
  return `From this dialog, extract the meetings/appointments, refer to them all as meetings. If any of the reason to meet, datetime or location are mentioned, include them, otherwise just leave it empty. Return all of them in a json object with this structure 
    {
        meetings: {
            reasonToMeet: string
            datetime: datetime string
            location: string
        }[]
    }
    
    The dialog is as follows: "${messages.join(" ")}"`;
};

export const generateExtractContentByInterestsPrompt = (
  messages: string[],
  topics: string[]
) => {
  return `From this dialog, extract all the content with regards to these topics of interests: [${topics.join(
    ", "
  )}]. Return all of the content grouped by topic in a json object with this structure 
    {
        topics: {
            topic: string
            content: string[]
        }[]
    }
    
    The dialog is as follows: "${messages.join(" ")}"`;
};

export const generateSummarizeWithTopicsPrompt = (
  messages: string[],
  topics: string[]
) => {
  return `Summarize what we talked about in this dialog. ${
    topics.length > 0
      ? `Pay more attention to the following topics: [${topics.join(", ")}]`
      : ""
  }
    
    The dialog is as follows: "${messages.join(" ")}"`;
};
