import sqlite3 from "sqlite3";

import { runDbQuery, getAllFromDb } from "./function.js";

async function main() {
  const db = new sqlite3.Database(":memory:");

  await runDbQuery(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  await runDbQuery(db, "INSERT INTO books(title) VALUES(?)", ["Test"]);
  const rows = await getAllFromDb(db, "SELECT id FROM books");
  console.log(rows);
  const records = await getAllFromDb(db, "SELECT * FROM books");
  console.log(records);
  await runDbQuery(db, "DROP TABLE books");
  db.close();
}

main();
