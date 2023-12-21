import mysql from "mysql2"; // Using 'mysql2' with promises

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "biswajit123456789",
  database: "blog",
});
