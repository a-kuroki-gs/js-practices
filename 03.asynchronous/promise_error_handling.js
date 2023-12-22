import sqlite3 from "sqlite3";

import { runDbQuery, getAllFromDb, closeDb } from "./db_operations.js";

function main() {
  const db = new sqlite3.Database(":memory:");

  runDbQuery(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() => runDbQuery(db, "INSERT INTO book(title) VALUES(?)", ["Test"]))
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => getAllFromDb(db, "SELECT books_id FROM books"))
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => {
      runDbQuery(db, "DROP TABLE books");
    })
    .then(() => {
      closeDb(db);
    });
}

main();
