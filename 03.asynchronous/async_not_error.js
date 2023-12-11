import sqlite3 from "sqlite3";

import {
  create_table,
  insert_record,
  select_id_from_table,
  select_all_from_table,
  drop_table,
} from "./promise_methods.js";

async function test() {
  const db = new sqlite3.Database(":memory:");

  await create_table(db, "books");
  await insert_record(db, "books", "Test");
  const rows = await select_id_from_table(db, "books", "id");
  console.log(rows);
  const records = await select_all_from_table(db, "books");
  console.log(records);
  await drop_table(db, "books");
  db.close();
}

test();
