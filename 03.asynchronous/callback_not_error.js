import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(":memory:")

function test() {
  db.run("CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)", (err) => {
    if (err) {
      console.error(err.message);
    } else {
      db.run("INSERT INTO books(title) VALUES(?)", ["Test"], (err) => {
        if (err) {
          console.error(err.message);
        } else {
          db.all("SELECT id FROM books", [], (err, rows) => {
            if (err) {
              console.error(err.message);
            } else {
              console.log(rows);
              db.all("SELECT * FROM books", [], (err, records) => {
                if (err) {
                  console.error(err.message);
                } else {
                  console.log(records);
                  db.run("DROP TABLE books", (err) => {
                    if (err) {
                      console.error(err.message);
                    }
                  db.close();
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}

test()
