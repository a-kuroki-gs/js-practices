import sqlite3 from "sqlite3";

import { runDbQuery, getAllFromDb } from "./function.js";

async function main() {
  const db = new sqlite3.Database(":memory:");

  try {
    await runDbQuery(
      db,
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
    await runDbQuery(db, "INSERT INTO book(title) VALUES(?)", ["Test"]);
  } catch (e) {
    if (e instanceof Error && e.errno === 1 && e.code === "SQLITE_ERROR") {
      console.log(e.message);
    }
  }
  try {
    await getAllFromDb(db, "SELECT books_id FROM books");
  } catch (e) {
    if (e instanceof Error && e.errno === 1 && e.code === "SQLITE_ERROR") {
      console.log(e.message);
    }
  }
  await runDbQuery(db, "DROP TABLE books");
  db.close();
}

main();
