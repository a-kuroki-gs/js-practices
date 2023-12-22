import sqlite3 from "sqlite3";

import { runDbQuery, getAllFromDb, closeDb } from "./db_operations.js";

async function main() {
  const db = new sqlite3.Database(":memory:");

  await runDbQuery(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  const statement = await runDbQuery(db, "INSERT INTO books(title) VALUES(?)", [
    "Test",
  ]);
  console.log(`id: ${statement.lastID}`);
  const books = await getAllFromDb(db, "SELECT * FROM books");
  books.forEach((book) => {
    console.log(`{ id: ${book.id}, title: ${book.title} }`);
  });
  await runDbQuery(db, "DROP TABLE books");
  await closeDb(db);
}

main();
