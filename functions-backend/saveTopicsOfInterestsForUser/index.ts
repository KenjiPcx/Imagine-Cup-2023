import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getContainer } from "../scripts/databaseConfig";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log(
    "Save topics of interests for user HTTP trigger function processed a request."
  );

  const userId = req.query.userId || (req.body && req.body.userId);
  const topicsOfInterests =
    req.query.topicsOfInterests || (req.body && req.body.topicsOfInterests);

  try {
    const container = await getContainer("users", ["/id"]);
    const { resource } = await container.item(userId, userId).read();

    resource.appSettings.topicsOfInterests = topicsOfInterests;
    await container.item(userId, userId).replace(resource)

    context.res = {
      // status: 200, /* Defaults to 200 */
    };
  } catch (err) {
    context.res = {
      status: 400 /* Defaults to 200 */,
      body: err,
    };
  }
};

export default httpTrigger;
