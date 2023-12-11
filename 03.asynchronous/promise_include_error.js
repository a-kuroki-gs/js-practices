import sqlite3 from 'sqlite3';

import { create_table, insert_record, select_id_from_table, drop_table } from "./promise_methods.js";

function test() {
  const db = new sqlite3.Database(":memory:");

  create_table(db, "books").then(() => {
    return insert_record(db, "books", );
  })
  .catch(err => {
    console.error(err.message);
  })
  .then(() => {
    return select_id_from_table(db, "books", "books_id");
  })
  .catch(err => {
    console.error(err.message);
  })
  .then(() => {
    drop_table(db, "books");
    db.close();
  });
}

test();
