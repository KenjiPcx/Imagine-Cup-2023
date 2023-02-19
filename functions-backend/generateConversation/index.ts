import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  openai,
  model,
  max_tokens,
  temperature,
} from "../scripts/openAIConfig";
import {
  generateGenerateConversationPrompt,
} from "../scripts/prompts";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const userPrompt = req.query.prompt || (req.body && req.body.userPrompt);

  const prompt = generateGenerateConversationPrompt(userPrompt);

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
