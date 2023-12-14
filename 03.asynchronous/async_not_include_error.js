import sqlite3 from "sqlite3";

import { run_db_run, run_db_all } from "./function.js";

async function test() {
  const db = new sqlite3.Database(":memory:");

  await run_db_run(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  await run_db_run(db, "INSERT INTO books(title) VALUES(?)", ["Test"]);
  const rows = await run_db_all(db, "SELECT id FROM books");
  console.log(rows);
  const records = await run_db_all(db, "SELECT * FROM books");
  console.log(records);
  await run_db_run(db, "DROP TABLE books");
  db.close();
}

test();
