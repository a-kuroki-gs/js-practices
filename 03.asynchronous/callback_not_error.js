import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function test() {
  db.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () => {
      db.run("INSERT INTO books(title) VALUES(?)", ["Test"], () => {
        db.all("SELECT id FROM books", [], (err, rows) => {
          console.log(rows);
          db.all("SELECT * FROM books", [], (err, records) => {
            console.log(records);
            db.run("DROP TABLE books", () => {
              db.close();
            });
          });
        });
      });
    },
  );
}

test();
