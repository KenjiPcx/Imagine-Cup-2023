export const generateAnalyzeMessagesPrompt = (messages: string[]) => {
  return `Does this scrambled phone call dialog have any suspicious content, highlight all parts that might be scams and explain, return the result in the json format 
{isScam: boolean, suspiciousContent: {text: string, reason: string}[]}

"${messages.join(" ")}"
`;
};
