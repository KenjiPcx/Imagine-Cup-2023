import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getContainer } from "../scripts/databaseConfig";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Get all content of interests function processed a request.");

  const userId = req.query.userId || (req.body && req.body.userId);

  try {
    const contentOfInterestsContainer = await getContainer(
      "contentOfInterests",
      ["/userId"]
    );
    const querySpec = {
      query: `select * from contentOfInterests c where c.userId=@userId`,
      parameters: [
        {
          name: "@userId",
          value: userId,
        },
      ],
    };
    const { resources } = await contentOfInterestsContainer.items
      .query(querySpec)
      .fetchAll();
    context.log(`Read item:`, resources);

    const body = resources.map((r) => r.contentOfInterests).flat();
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: body,
    };
  } catch (err) {
    context.res = {
      status: 400 /* Defaults to 200 */,
      body: err,
    };
  }
};

export default httpTrigger;
