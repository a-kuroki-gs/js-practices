export function create_table(db, table) {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE ${table}(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
}

export function insert_record(db, table, title) {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO ${table}(title) VALUES(?)`, [title], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function select_id_from_table(db, table, column) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT ${column} FROM ${table}`, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function select_all_from_table(db, table) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${table}`, [], (err, records) => {
      if (err) {
        reject(err);
      } else {
        resolve(records);
      }
    });
  });
}

export function drop_table(db, table) {
  return new Promise((resolve, reject) => {
    db.run(`DROP TABLE ${table}`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
