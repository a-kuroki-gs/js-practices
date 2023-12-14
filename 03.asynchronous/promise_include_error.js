import sqlite3 from "sqlite3";

import { runDbQuery, getAllFromDb } from "./function.js";

function main() {
  const db = new sqlite3.Database(":memory:");

  runDbQuery(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() => {
      return runDbQuery(db, "INSERT INTO book(title) VALUES(?)", ["Test"]);
    })
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => {
      return getAllFromDb(db, "SELECT books_id FROM books");
    })
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => {
      runDbQuery(db, "DROP TABLE books");
      db.close();
    });
}

main();
