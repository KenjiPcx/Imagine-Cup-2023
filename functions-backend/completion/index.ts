import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { openai } from "../scripts/openAIConfig";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const prompt = req.query.prompt || (req.body && req.body.prompt);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 500,
    temperature: 0,
  });

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: response.data.choices[0].text,
  };
};

export default httpTrigger;
