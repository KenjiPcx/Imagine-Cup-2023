import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.CosmosDbEndpoint;
const key = process.env.CosmosDbKey;

export const client = new CosmosClient({ endpoint, key });

export const getDb = async () => {
  const { database } = await client.databases.createIfNotExists({
    id: "callnalysis-db",
  });
  return database;
};

export const getContainer = async (
  containerName: "tasks" | "meetings" | "contentOfInterests" | "calls" | "users",
  partitionKeyPaths = ["/userId"]
) => {
  const db = await getDb();
  const { container } = await db.containers.createIfNotExists({
    id: containerName,
    partitionKey: {
      paths: partitionKeyPaths,
    },
  });

  return container;
};
