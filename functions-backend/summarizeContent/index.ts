import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  max_tokens,
  openai,
  model,
  temperature,
} from "../scripts/openAIConfig";
import { generateSummarizeWithTopicsPrompt } from "../scripts/prompts";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Summarize Content HTTP trigger function processed a request.");

  const messages: string[] =
    req.query.messages || (req.body && req.body.messages);
  const userInterests: string[] =
    req.query.userInterests || (req.body && req.body.userInterests);
  // todo: get user interests
  // const userInterests = [];

  const prompt = generateSummarizeWithTopicsPrompt(messages, userInterests);

  try {
    const response = await openai.createCompletion({
      model: model,
      prompt: prompt,
      max_tokens: max_tokens,
      temperature: temperature,
    });

    const answer = response.data.choices[0].text;

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: answer,
    };
  } catch (err) {
    context.res = {
      status: 400,
      body: err,
    };
  }
};

export default httpTrigger;
