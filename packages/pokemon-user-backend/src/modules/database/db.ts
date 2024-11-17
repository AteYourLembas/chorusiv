import path from "path";
import { Wait } from "testcontainers";
import { PostgreSqlContainer } from './initializable-postgresql-container';

const initScriptPath = path.resolve(
  __dirname,
  "modules/database/init/init.sql"
);
console.log("Init SQL script path:", initScriptPath);

export const postgresContainer = new PostgreSqlContainer()
  .withDatabase('pokemon')
  .withUsername('admin')
  .withPassword('admin')
  .withInitScript(initScriptPath)
  .withWaitStrategy(Wait.forLogMessage("database system is ready to accept connections").withStartupTimeout(120000)) // 120 seconds timeout
  .withReuse();

export const startDatabase = async () => {
  const startedContainer = await postgresContainer.start();

  // Retrieve connection details from the started container
  const host = startedContainer.getHost(); // Typically 'localhost'
  const port = startedContainer.getMappedPort(5432); // Dynamically mapped port
  const database = startedContainer.getDatabase();
  const username = startedContainer.getUsername();
  const password = startedContainer.getPassword();

  console.log(`Postgres is running on ${host}:${port}`);

  // Use these details in your app configuration
  process.on("SIGINT", async () => {
    await startedContainer.stop();
    process.exit();
  });

  return { host, port, database, username, password };
};
