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
export const getCallByKey = `${rootEndpoint}/getCallByKey`;
export const getAllCallByUserId = `${rootEndpoint}/getAllCalls`;
export const saveCallUrl = `${rootEndpoint}/saveCall`;
export const getUserAppSettingsUrl = `${rootEndpoint}/getUserAppSettings`;

// Auth endpoints
export const loginUrl =
  "/.auth/logout?post_logout_redirect_uri=https://thankful-mushroom-0de6c9303.2.azurestaticapps.net/";
export const logoutUrl =
  "/.auth/login/github?post_login_redirect_uri=https://thankful-mushroom-0de6c9303.2.azurestaticapps.net/";
