import mysql from "mysql2"; // Using 'mysql2' with promises

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hrushi@1234#",
  database: "blog",
});
