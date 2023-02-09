import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OpenAIApiKey,
});

export const openai = new OpenAIApi(configuration);

export const max_tokens = 1300;

export const temperature = 0;

export const model = "text-davinci-003";
