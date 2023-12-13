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
    await this.memory.createTable();

    if (argv.l === true) {
      // 一覧
      (async () => {
        const memos = await this.memory.selectAll();
        memos.forEach(memo => {
          console.log(memo.firstLine);
        });
      })();
    } else if (argv.r === true) {
      // 参照
      (async () => {
        const choices = await this.buildChoices();
        const prompt = await this.buildPrompt('see', choices);

        const id = await prompt.run();
        const memo = await this.memory.selectMemo(id);
        console.log(memo.content);
      })();
    } else if (argv.d === true) {
      // 削除
      (async () => {
        const choices = await this.buildChoices();
        const prompt = await this.buildPrompt('delete', choices);
  
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

  async buildPrompt(operation, choices) {
    const { Select } = enquirer;

    return new Select({
      name: 'selections',
      type: 'select',
      multiple: false,
      message: `Choose a note you want to ${operation}:`,
      choices: choices,
      result() {
        return this.focused.value;
      }
    })
  }

  async buildChoices() {
    const memos = await this.memory.selectAll();

    return memos.map(memo => ({
      name: memo.firstLine, value: memo.id
    }));
  }
}

const memoapp = new App();
memoapp.run();
