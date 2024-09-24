//datatypes for database connection and server

export interface ServerConfig {
  port: any;
  project_name: string;
}
export interface DBInterface {
  port: string;
  database: string;
  userName: string;
  password: string;
}
