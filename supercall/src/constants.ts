// const root = "http://localhost:7071";
const root = "";
const rootEndpoint = `${root}/api`;

// AI endpoints
export const completionUrl = `${rootEndpoint}/completion`;
export const analyzeMessagesUrl = `${rootEndpoint}/analyzeMessages`;
export const summarizeMessagesUrl = `${rootEndpoint}/summarizeContent`;
export const identifyScamsUrl = `${rootEndpoint}/identifyScam`;
export const identifyTasksUrl = `${rootEndpoint}/identifyTasks`;
export const identifyMeetingsUrl = `${rootEndpoint}/identifyMeetings`;
export const identifyContentOfInterestUrl = `${rootEndpoint}/identifyContentOfInterests`;
export const customExtractionUrl = `${rootEndpoint}/customExtractionCommand`;

// Data endpoints
export const getCallByKeyUrl = `${rootEndpoint}/getCallByKey`;
export const getAllCallByUserIdUrl = `${rootEndpoint}/getAllCalls`;
export const saveCallUrl = `${rootEndpoint}/saveCall`;
export const getUserAppSettingsUrl = `${rootEndpoint}/getUserAppSettings`;
export const saveUserTopicsUrl = `${rootEndpoint}/saveTopicsOfInterestsForUser`;
export const getAllTasksUrl = `${rootEndpoint}/getAllTasks`;
export const getAllMeetingsUrl = `${rootEndpoint}/getAllMeetings`;
export const getAllContentOfInterestsUrl = `${rootEndpoint}/getAllContentOfInterests`;
export const addMentalNote = `${rootEndpoint}/addMentalNote`;
export const getAllMentalNotes = `${rootEndpoint}/getAllMentalNotes`;

// Auth endpoints
export const loginUrl = `/.auth/login/github?post_login_redirect_uri=${root}/`;
export const logoutUrl = `/.auth/logout?post_logout_redirect_uri=${root}/`;
