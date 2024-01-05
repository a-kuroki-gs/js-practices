import sqlite3 from "sqlite3";

import { runDbQuery, getAllFromDb, closeDb } from "./db_operations.js";

function main() {
  const db = new sqlite3.Database(":memory:");

  runDbQuery(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() => runDbQuery(db, "INSERT INTO books(title) VALUES(?)", ["Test"]))
    .then((statement) => {
      console.log(`id: ${statement.lastID}`);
      return getAllFromDb(db, "SELECT * FROM books");
    })
    .then((books) => {
      books.forEach((book) => {
        console.log(`{ id: ${book.id}, title: ${book.title} }`);
      });
      return runDbQuery(db, "DROP TABLE books");
    })
    .then(() => closeDb(db));
}

main();
