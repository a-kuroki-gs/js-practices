import sqlite3 from "sqlite3";

import { run_db_run, run_db_all } from "./function.js";

function test() {
  const db = new sqlite3.Database(":memory:");

  run_db_run(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() => {
      return run_db_run(db, "INSERT INTO books(title) VALUES(?)", ["Test"]);
    })
    .then(() => {
      return run_db_all(db, "SELECT id FROM books");
    })
    .then((rows) => {
      console.log(rows);
      return run_db_all(db, "SELECT * FROM books");
    })
    .then((records) => {
      console.log(records);
      run_db_run(db, "DROP TABLE books");
      db.close();
    });
}

test();
