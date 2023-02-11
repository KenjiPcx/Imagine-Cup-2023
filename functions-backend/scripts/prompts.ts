export const generateAnalyzeMessagesPrompt = (
  messages: string[],
  userInterests: string[]
) => {
  return `Detect if there are any "tasks or potential tasks", "bookings or appointments", and topics of interests in my array [${userInterests.join(
    ", "
  )}] inside the dialog. For the topics in my array, if they can be found in the dialog, keep them in the array, otherwise remove them.
   Return the result in json format with this type 
   { "hasTasksOrPotentialTasks": boolean; "hasBookingsOrAppointments": boolean; "topicsOfInterestsFound": string[]; }

   The dialog is as follows: ${messages.join(" ")}
`;
};

export const generateScamDetectionPrompt = (messages: string[]) => {
  return `Tell me if this message contains suspicious content. Extract the scams and shady contents from this dialog, explain why they are, then suggest what a user should do next like how to verify the caller or just end the call etc. Return the result directly in json with this type = { "isScam": boolean; "warnings": { "text": string; "reason": string; }[]; "advice": string; }
  
  The dialog is as follows: "${messages.join(" ")}"
`;
};

export const generateTasksDetectionPromps = (messages: string[]) => {
  return `From this dialog, extract the tasks and potential tasks. After that, suggest some SMART subtasks to help achieve each goal and explain if possible. Return the result in json with this type 
    { "tasks": { "goal": string, "subtasks": { "action": string, "reason": string }[] }[] }
    
    The dialog is as follows: "${messages.join(" ")}"`;
};

export const generateMeetingsDetectionPrompt = (messages: string[]) => {
  return `From this dialog, extract the meetings and their details. A meeting should have a title, details about what it is about, names of people involved (only include names), a location and when it is happening. The title and details are mandatory fields, the rest are optional Return the results in json with this type
    { "meetings": { "title": string, "details": string, "participants": string, "datetime"?: string, "location": string, }[]  }
    
    The dialog is as follows: "${messages.join(" ")}"`;
};

export const generateExtractContentByInterestsPrompt = (
  messages: string[],
  topics: string[]
) => {
  return `From this dialog, extract all the content with regards to these topics of interests: [${topics.join(
    ", "
  )}]. Return all of the content grouped by topic in json with this type 
    { "topics": { "topic": string, "content": string[] }[] }
    
    The dialog is as follows: "${messages.join(" ")}"`;
};

export const generateSummarizeWithTopicsPrompt = (
  messages: string[],
  topics: string[]
) => {
  return `Summarize what me and the other participant talked about in this dialog, write it in a style suitable for my reflective journal. ${
    topics.length > 0
      ? `Pay more attention to the following topics when summarizing if they exist: [${topics.join(
          ", "
        )}]`
      : ""
  }
  
  The dialog is as follows: "${messages.join(" ")}"`;
};
