import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getContainer } from "../scripts/databaseConfig";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Get all meetings function processed a request.");

  const userId = req.query.userId || (req.body && req.body.userId);

  try {
    const meetingsContainer = await getContainer("meetings", ["/userId"]);
    const querySpec = {
      query: "select * from meetings t where t.userId=@userId",
      parameters: [
        {
          name: "@userId",
          value: userId,
        },
      ],
    };
    const { resources } = await meetingsContainer.items
      .query(querySpec)
      .fetchAll();
    context.log(`Read item:`, resources);

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: resources,
    };
  } catch (err) {
    context.res = {
      status: 400 /* Defaults to 200 */,
      body: err,
    };
  }
};

export default httpTrigger;
