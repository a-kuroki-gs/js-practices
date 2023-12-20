import sqlite3 from "sqlite3";

import { runDbQuery, getAllFromDb, closeDb } from "./function.js";

async function main() {
  const db = new sqlite3.Database(":memory:");

  await runDbQuery(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  const book = await runDbQuery(db, "INSERT INTO books(title) VALUES(?)", [
    "Test",
  ]);
  console.log(`id: ${book.lastID}`);
  const books = await getAllFromDb(db, "SELECT * FROM books");
  books.forEach(book => {
    console.log(`{ id: ${book.id}, title: ${book.title} }`);
  })
  await runDbQuery(db, "DROP TABLE books");
  await closeDb(db);
}

main();
