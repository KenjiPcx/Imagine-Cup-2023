import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  max_tokens,
  openai,
  model,
  temperature,
} from "../scripts/openAIConfig";
import { generateMeetingsDetectionPrompt } from "../scripts/prompts";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Identify Meetings HTTP trigger function processed a request.");

  const messages: string[] =
    req.query.messages || (req.body && req.body.messages);

  const prompt = generateMeetingsDetectionPrompt(messages);

  try {
    const response = await openai.createCompletion({
      model: model,
      prompt: prompt,
      max_tokens: max_tokens,
      temperature: temperature,
    });

    const body = JSON.parse(response.data.choices[0].text);

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: body.meetings,
    };
  } catch (err) {
    context.res = {
      status: 400,
      body: err,
    };
  }
};

export default httpTrigger;
