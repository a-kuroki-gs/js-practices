// import Memo from './memo.js';

class Database {
  constructor() {
    this.db = [];
  }

  max_id() {
    const ids = this.db.map(memo => memo.id);
    return ids.length > 0 ? Math.max(...ids) : -1;
  }

  add_memo(memo) {
    memo.id = this.max_id() + 1;
    this.db[memo.id] = memo;
  }

  list_of_memos() {
    return this.db.map(function(memo){
      return { name: memo.first_line, value: memo.id };
    });
  }

  read_memo(id) {
    return this.db.find(memo => memo.id === id);
  }

  delete_memo(id) {
    const memo = this.db.find(memo => memo.id === id);
    memo.delete;
    this.db.splice(id, 1);
  }
}

export default Database;

// これ以降テストデータ
// const memos = new Database();
// var memo0 = new Memo("test0");
// memos.add_memo(memo0);

// var memo1 = new Memo("test1")
// memos.add_memo(memo1);

// var memo2 = new Memo("test2")
// memos.add_memo(memo2);
// console.log(memos);

// var memo3 = new Memo("test3")
// memos.add_memo(memo3);
// var memo = new Memo("test");
// memos.add_memo(memo);
// const keys = Object.keys(memos);
// console.log(memos.max_id());
// console.log(memos.find_index(memo0));
// console.log(memos.find_index(memo2));
// console.log(memos.find_index(memo3));
// console.log(memos.find_index(memo));

// memos.delete_memo(0)
// memos.add_memo(new Memo("test22"))
// console.log(memos);

// var memo2 = new Memo("test2")
// memos.add_memo(memo2);

// console.log(memos);

// console.log(memos.find_index(memo1));
// console.log(memos.find_index(memo2));
// console.log(memos.find_index(memo3));
// console.log(memos.find_index(memo));
