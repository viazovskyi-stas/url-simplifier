import {Db, MongoClient} from "mongodb";

// Create cached connection variable
let cachedDB: Db | null = null;

export default async function connectToDatabase(): Promise<Db> {
  if (cachedDB) {
    console.info("Using cached client!");
    return cachedDB;
  }
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const dbName = process.env.DB_NAME || "test";
  console.info("No client found! Creating a new one.");
  // @ts-ignore If no connection is cached, create a new one
  const client = new MongoClient(process.env.DB_HOST as string, opts);
  await client.connect();
  cachedDB = client.db(dbName);
  return cachedDB;
}