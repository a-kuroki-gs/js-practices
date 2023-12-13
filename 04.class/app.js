import minimist from 'minimist';
import readline from 'readline';
import enquirer from 'enquirer';

import Database from './db.js';
import Memo from './memo.js';

class App {
  constructor() {
    this.memory = new Database();
  }

  async run() {
    const argv = minimist(process.argv.slice(2));
    const { Select } = enquirer;
    this.memory.createTable();

    if (argv.l === true) {
      // 一覧
      (async () => {
        const memos = await this.memory.selectAll();
        // console.log(memos);
        memos.forEach(memo => {
          console.log(memo.firstLine);
        });
      })();
    } else if (argv.r === true) {
      // 参照
      (async () => {
        const prompt = new Select({
          name: 'selections',
          type: 'select',
          multiple: false,
          message: 'Choose a note you want to see:',
          choices: this.buildSelection(),
          result() {
            return this.focused.value;
          }
        });
  
        const id = await prompt.run();
        const memo = await this.memory.selectMemo(id);
        console.log(memo.content);
      })();
    } else if (argv.d === true) {
      // 削除
      (async () => {
        const prompt = new Select({
          name: 'selections',
          type: 'select',
          multiple: false,
          message: 'Choose a note you want to delete:',
          choices: this.buildSelection(),
          result() {
            return this.focused.value;
          }
        });
  
        const id = await prompt.run();
        const memo = await this.memory.selectMemo(id);
        await this.memory.deleteMemo(id);
        console.log(`${memo.firstLine} を削除しました`);
      })();
    } else if (argv._.length === 0) {
      // 入力
      const contents = [];
      const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      reader.on('line', line => {
        contents.push(line);
      });

      reader.on('close', () => {
        const content = contents.join('\n');
        const memo = new Memo(null, content);

        this.memory.insertMemo(memo);
      });
    }
  }

  async buildSelection() {
    const memos = await this.memory.selectAll();
    console.log(memos);
    return memos.map(memo => ({
      name: memo.firstLine, value: memo.id
    }));
  }
}

const memoapp = new App();
memoapp.run();
