import minimist from 'minimist';
import readline from 'readline';
const argv = minimist(process.argv.slice(2));
// console.log(argv);

import enquirer from 'enquirer'

import Database from './db.js';
import Memo from './memo.js';

const memodb = new Database();
// テストデータ
memodb.add_memo(new Memo("test0"));
memodb.add_memo(new Memo("test1"));
memodb.add_memo(new Memo("test2\nsss"));
memodb.add_memo(new Memo("test3"));

if (argv.l === true) {
  // 一覧
  const memo_list = memodb.list_of_memos();
  memo_list.forEach(memo => {
    console.log(memo.name);
  })
  // console.log(memos.name);
} else if (argv.r === true) {
  // 参照
  (async ()=> {
    const choices = memodb.list_of_memos();
    const question = {
      name: 'selections',
      type: 'select',
      multiple: false,
      message: 'Choose a note you want to see:',
      choices: choices,
    };

    const answer = await enquirer.prompt(question);
    // answerの全表示
    console.log(answer.selections);
    const id = await choices.find(choice => choice.name === answer.selections).value;
    console.log(memodb.read_memo(id).content);
  })();
} else if (argv.d === true) {
  // 削除
  (async ()=> {
    const choices = memodb.list_of_memos();

    const question = {
      name: 'selections',
      type: 'select',
      multiple: false,
      message: 'Choose a note you want to delete:',
      choices: choices,
    };

    const answer = await enquirer.prompt(question);
    // answerの削除
    const id = await choices.find(choice => choice.name === answer.selections).value;
    memodb.delete_memo(id);
    console.log(`${answer.selections} を削除しました`);
  })();
}
