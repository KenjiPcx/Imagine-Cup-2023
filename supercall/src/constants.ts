const root = "http://localhost:7071";
const rootEndpoint = "http://localhost:7071/api";

// AI endpoints
export const completionUrl = `${rootEndpoint}/completion`;
export const analyzeMessagesUrl = `${rootEndpoint}/analyzeMessages`;
export const summarizeMessagesUrl = `${rootEndpoint}/summarizeContent`;
export const identifyScamsUrl = `${rootEndpoint}/identifyScam`;
export const identifyTasksUrl = `${rootEndpoint}/identifyTasks`;
export const identifyMeetingsUrl = `${rootEndpoint}/identifyMeetings`;
export const identifyContentOfInterestUrl = `${rootEndpoint}/identifyContentOfInterests`;

// Data endpoints
export const getCallByKeyUrl = `${rootEndpoint}/getCallByKey`;
export const getAllCallByUserIdUrl = `${rootEndpoint}/getAllCalls`;
export const saveCallUrl = `${rootEndpoint}/saveCall`;
export const getUserAppSettingsUrl = `${rootEndpoint}/getUserAppSettings`;
export const saveUserTopicsUrl = `${rootEndpoint}/saveTopicsOfInterestsForUser`;
export const getAllTasksUrl = `${rootEndpoint}/getAllTasks`;
export const getAllMeetingsUrl = `${rootEndpoint}/getAllMeetings`;
export const getAllContentOfInterestsUrl = `${rootEndpoint}/getAllContentOfInterests`;

// Auth endpoints
export const loginUrl = `/.auth/logout?post_logout_redirect_uri=${root}/`;
export const logoutUrl = `/.auth/login/github?post_login_redirect_uri=${root}/`;
