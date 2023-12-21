import mysql from "mysql2"; // Using 'mysql2' with promises

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YOUR_SQL-WORKBENCH-PASSWORD",
  database: "blog",
});
