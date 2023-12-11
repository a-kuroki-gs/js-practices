import sqlite3 from "sqlite3";

import {
  create_table,
  insert_record,
  select_id_from_table,
  drop_table,
} from "./methods.js";

async function test() {
  const db = new sqlite3.Database(":memory:");

  try {
    await create_table(db, "books");
    await insert_record(db, "book", "Test");
  } catch (e) {
    if (e instanceof Error && e.errno === 1 && e.code === "SQLITE_ERROR") {
      console.log(e.message);
    }
  }
  try {
    await select_id_from_table(db, "books", "books_id");
  } catch (e) {
    if (e instanceof Error && e.errno === 1 && e.code === "SQLITE_ERROR") {
      console.log(e.message);
    }
  }
  await drop_table(db, "books");
  db.close();
}

test();
