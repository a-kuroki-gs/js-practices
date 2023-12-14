import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function test() {
  db.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () => {
      db.run("INSERT INTO book(title) VALUES(?)", ["Test"], (err) => {
        if (err) {
          console.error(err.message);
        }
        db.all("SELECT books_id FROM books", [], (err) => {
          if (err) {
            console.error(err.message);
          }
          db.run("DROP TABLE books", () => {
            db.close();
          });
        });
      });
    },
  );
}

test();
