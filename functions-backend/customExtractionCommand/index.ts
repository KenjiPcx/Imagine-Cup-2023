import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  max_tokens,
  model,
  openai,
  temperature,
} from "../scripts/openAIConfig";
import { generateCustomExtractionPrompt } from "../scripts/prompts";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Custom extraction command function processed a request.");
  const messages: string[] =
    req.query.messages || (req.body && req.body.messages);

  // todo: get user interests
  const userPrompt = req.query.prompt || (req.body && req.body.userPrompt);

  const prompt = generateCustomExtractionPrompt(messages, userPrompt);

  try {
    const response = await openai.createCompletion({
      model: model,
      prompt: prompt,
      max_tokens: max_tokens,
      temperature: temperature,
    });

    const body = response.data.choices[0].text;
    context.log(body);

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: body,
    };
  } catch (err) {
    context.res = {
      status: 400,
      body: err,
    };
  }
};

export default httpTrigger;
