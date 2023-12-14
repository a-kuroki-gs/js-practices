import sqlite3 from "sqlite3";

import { runDbQuery, getAllFromDb } from "./function.js";

async function main() {
  const db = new sqlite3.Database(":memory:");

  await runDbQuery(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  const book = await runDbQuery(db, "INSERT INTO books(title) VALUES(?)", ["Test"]);
  console.log(`id: ${book.lastID}`);
  const books = await getAllFromDb(db, "SELECT * FROM books");
  console.log(books);
  await runDbQuery(db, "DROP TABLE books");
  db.close();
}

main();
