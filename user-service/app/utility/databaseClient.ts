import { Client } from "pg";

export const DBClient = () => {
  return new Client({
    host: "localhost",
    user: "root",
    database: "user_service",
    password: "root",
    port: 5432,
  });
};