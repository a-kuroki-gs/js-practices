import sqlite3 from "sqlite3";

import { runDbQuery, getAllFromDb } from "./function.js";

function main() {
  const db = new sqlite3.Database(":memory:");

  runDbQuery(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() => runDbQuery(db, "INSERT INTO books(title) VALUES(?)", ["Test"]))
    .then(() => getAllFromDb(db, "SELECT id FROM books"))
    .then((rows) => {
      console.log(rows);
      return getAllFromDb(db, "SELECT * FROM books");
    })
    .then((books) => {
      console.log(books);
      runDbQuery(db, "DROP TABLE books");
      db.close();
    });
}

main();
