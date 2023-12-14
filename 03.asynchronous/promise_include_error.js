import sqlite3 from "sqlite3";

import { run_db_run, run_db_all } from "./function.js";

function main() {
  const db = new sqlite3.Database(":memory:");

  run_db_run(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() => {
      return run_db_run(db, "INSERT INTO book(title) VALUES(?)", ["Test"]);
    })
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => {
      return run_db_all(db, "SELECT books_id FROM books");
    })
    .catch((err) => {
      console.error(err.message);
    })
    .then(() => {
      run_db_run(db, "DROP TABLE books");
      db.close();
    });
}

main();
