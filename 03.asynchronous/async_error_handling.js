import sqlite3 from "sqlite3";

import { runDbQuery, getAllFromDb, closeDb } from "./db_operations.js";

async function main() {
  const db = new sqlite3.Database(":memory:");

  await runDbQuery(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  try {
    await runDbQuery(db, "INSERT INTO book(title) VALUES(?)", ["Test"]);
  } catch (e) {
    if (e.code === "SQLITE_ERROR") {
      console.log(e.message);
    }
  }
  try {
    await getAllFromDb(db, "SELECT books_id FROM books");
  } catch (e) {
    if (e instanceof Error && e.code === "SQLITE_ERROR") {
      console.log(e.message);
    }
  }
  await runDbQuery(db, "DROP TABLE books");
  await closeDb(db);
}

main();
