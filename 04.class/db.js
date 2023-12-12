import Memo from './memo.js';
import * as fs from 'node:fs';

class Database {
  constructor() {
    this.db = {};
  }

  max_id() {
    const ids = Object.keys(this.db);
    return ids.length > 0 ? Math.max(...ids) : -1;
  }

  add_memo(memo) {
    memo.id = this.max_id() + 1;
    this.db[memo.id] = memo;
  }

  list_of_memos() {
    return Object.values(this.db).map(memo => {
      return { name: memo.first_line(), value: memo.id };
    });
  }

  read_memo(id) {
    return this.db[id];
  }

  delete_memo(id) {
    // const memo = this.db.find(memo => memo.id === id);
    // memo.delete;
    // this.db.splice(id, 1);
    delete this.db[id];
  }

  // データをファイルに保存するメソッド
  saveToFile(filename) {
    const data = JSON.stringify(this.db);
    fs.writeFileSync(filename, data);
  }

  // ファイルからデータを読み込むメソッド
  loadFromFile(filename) {
    const data = fs.readFileSync(filename).toString();
    const parsedData = JSON.parse(data);

    Object.keys(parsedData).forEach(key => {
      const memoData = parsedData[key];
      const memo = new Memo(memoData.content); // Memo クラスのインスタンスを生成

      // id を修正して memo を this.db に追加
      memo.id = memoData.id;
      this.db[key] = memo;
    });
  }
}

export default Database;
