import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getContainer } from "../scripts/databaseConfig";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Get user app settings function processed a request.");

  const userId = req.query.userId || (req.body && req.body.userId);

  try {
    const container = await getContainer("users", ["/id"]);
    const { resource } = await container.item(userId, userId).read();
    context.log(`Read item:`, resource);

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: resource,
    };
  } catch (err) {
    context.res = {
      status: 400 /* Defaults to 200 */,
      body: err,
    };
  }
};

export default httpTrigger;
