import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { randomUUID } from "crypto";
import { getContainer } from "../scripts/databaseConfig";
import { CallInfo, CallItem } from "../scripts/types";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Save call HTTP trigger function processed a request.");
  const callInfo: CallInfo =
    req.query.callInfo || (req.body && req.body.callInfo);
  const userId = req.query.userId || (req.body && req.body.userId);

  try {
    const tasksContainer = await getContainer("tasks", ["/userId"]);
    const meetingsContainer = await getContainer("meetings", ["/userId"]);
    const contentOfInterestsContainer = await getContainer(
      "contentOfInterests",
      ["/userId"]
    );
    const callsContainer = await getContainer("calls", ["/userId"]);

    let callItem: CallItem = {
      id: randomUUID(),
      userId: userId,
      summary: callInfo.summary,
      timestamp: callInfo.timestamp,
    };

    if (callInfo.tasks.length > 0) {
      let tasksId = randomUUID();
      await tasksContainer.items.create({
        id: tasksId,
        userId: userId,
        tasks: callInfo.tasks,
      });
      callItem.tasksId = tasksId;
      context.log("Successfully saved tasks");
    }
    if (callInfo.meetings.length > 0) {
      let meetingsId = randomUUID();
      await meetingsContainer.items.create({
        id: meetingsId,
        userId: userId,
        meetings: callInfo.meetings,
      });
      callItem.meetingsId = meetingsId;
      context.log("Successfully saved meetings");
    }
    if (callInfo.contentOfInterests.length > 0) {
      let contentOfInterestsId = randomUUID();
      await contentOfInterestsContainer.items.create({
        id: contentOfInterestsId,
        userId: userId,
        contentOfInterests: callInfo.contentOfInterests,
      });
      callItem.contentOfInterestsId = contentOfInterestsId;
      context.log("Successfully saved content of interests");
    }

    await callsContainer.items.create(callItem);
    context.log("Successfully saved call info");

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: "Success",
    };
  } catch (err) {
    context.res = {
      status: 400 /* Defaults to 200 */,
      body: err,
    };
  }
};

export default httpTrigger;
