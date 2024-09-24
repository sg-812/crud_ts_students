import { DBInterface, ServerConfig } from "../interface/ConfigInterface";

const config = {
  server: <ServerConfig>{
    port: process.env["PORT"],
    project_name: process.env["PROJECT_NAME"],
  },
  DB: <DBInterface>{
    port: process.env["DB_PORT"],
    database: process.env["DB_DATABASE"],
    userName: process.env["DB_USERNAME"],
    password: process.env["DB_PASSWORD"],
  },
};
export { config };
