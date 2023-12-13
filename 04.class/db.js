import Memo from "./memo.js";
import sqlite3 from "sqlite3";

class Database {
  constructor() {
    this.db = new sqlite3.Database("memo.db");
  }

  async createTable() {
    await runDbRun(
      this.db,
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL)",
    );
  }

  async insertMemo(memo) {
    await runDbRun(this.db, "INSERT INTO memos (content) VALUES(?)", [
      memo.content,
    ]);
  }

  async selectMemo(id) {
    const row = await runDbGet(this.db, "SELECT * FROM memos WHERE id = ?", [
      id,
    ]);
    return row;
  }

  async selectAll() {
    const rows = await runDbAll(this.db, "SELECT * FROM memos");
    return rows;
  }

  async deleteMemo(id) {
    await runDbRun(this.db, "DELETE FROM memos WHERE id = ?", [id]);
  }
}

export default Database;

function runDbRun(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

function runDbGet(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        const memo = new Memo(row.id, row.content);
        resolve(memo);
      }
    });
  });
}

function runDbAll(db, sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const memos = rows.map((row) => new Memo(row.id, row.content));
        resolve(memos);
      }
    });
  });
}
