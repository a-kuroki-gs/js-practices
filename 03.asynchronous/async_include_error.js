import sqlite3 from "sqlite3";

import { run_db_run, run_db_all } from "./function.js";

async function main() {
  const db = new sqlite3.Database(":memory:");

  try {
    await run_db_run(
      db,
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
    await run_db_run(db, "INSERT INTO book(title) VALUES(?)", ["Test"]);
  } catch (e) {
    if (e instanceof Error && e.errno === 1 && e.code === "SQLITE_ERROR") {
      console.log(e.message);
    }
  }
  try {
    await run_db_all(db, "SELECT books_id FROM books");
  } catch (e) {
    if (e instanceof Error && e.errno === 1 && e.code === "SQLITE_ERROR") {
      console.log(e.message);
    }
  }
  await run_db_run(db, "DROP TABLE books");
  db.close();
}

main();
