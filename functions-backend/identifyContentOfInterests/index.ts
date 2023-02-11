import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  max_tokens,
  openai,
  model,
  temperature,
} from "../scripts/openAIConfig";
import { generateExtractContentByInterestsPrompt } from "../scripts/prompts";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log(
    "Identify Content of Interests HTTP trigger function processed a request."
  );

  const messages: string[] =
    req.query.messages || (req.body && req.body.messages);

  // todo: get user interests
  const topicsOfInterests: string[] =
    req.query.topicsOfInterests || (req.body && req.body.topicsOfInterests);

  const prompt = generateExtractContentByInterestsPrompt(
    messages,
    topicsOfInterests
  );

  try {
    const response = await openai.createCompletion({
      model: model,
      prompt: prompt,
      max_tokens: max_tokens,
      temperature: temperature,
    });

    const body = JSON.parse(response.data.choices[0].text);
    context.log(body);
    
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: body.topics,
    };
  } catch (err) {
    context.res = {
      status: 400,
      body: err,
    };
  }
};

export default httpTrigger;
