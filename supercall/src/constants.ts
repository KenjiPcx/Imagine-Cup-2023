const rootEndpoint = "http://localhost:7071/api";

// AI endpoitns
export const completionUrl = `${rootEndpoint}/completion`;
export const analyzeMessagesUrl = `${rootEndpoint}/analyzeMessages`;
export const summarizeMessagesUrl = `${rootEndpoint}/summarizeContent`;
export const identifyScamsUrl = `${rootEndpoint}/identifyScam`;
export const identifyTasksUrl = `${rootEndpoint}/identifyTasks`;
export const identifyMeetingsUrl = `${rootEndpoint}/identifyMeetings`;
export const identifyContentOfInterestUrl = `${rootEndpoint}/indentifyContentOfInterest`;

// Database Operations
export const getCallByKey = `${rootEndpoint}/getCallByKey`;
export const getAllCallByUserId = `${rootEndpoint}/getAllCalls`;
export const saveCallUrl = `${rootEndpoint}/saveCall`;
