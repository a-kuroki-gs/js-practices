import Memo from './memo.js';
import sqlite3 from 'sqlite3';

class Database {
  constructor() {
    this.db = new sqlite3.Database("memo.db");
  }

  async createTable() {
    await run_db_run(
      this.db,
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL)",
      );
  }

  async insertMemo(memo) {
    await run_db_run(this.db, "INSERT INTO memos (content) VALUES(?)", [memo.content]);
  }

  async selectMemo(id) {
    const row = await run_db_get(this.db, "SELECT * FROM memos WHERE id = ?", [id]);
    return row;
  }

  async selectAll() {
    const rows = await run_db_all(this.db, "SELECT * FROM memos");
    return rows;
  }

  async deleteMemo(id) {
    await run_db_run(this.db, "DELETE FROM memos WHERE id = ?", [id]);
  }
}

export default Database;

export function run_db_run(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

export function run_db_get(db, sql, params) {
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

export function run_db_all(db, sql) {
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
