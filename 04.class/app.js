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
      this.runMemoList();
    } else if (argv.r === true) {
      this.runReadMemo();
    } else if (argv.d === true) {
      this.runDeleteMemo();
    } else if (argv._.length === 0) {
      this.runInsertMemo();
    }
  }

  async runMemoList() {
    const memos = await this.memory.selectAll();
    memos.forEach(memo => {
      console.log(memo.firstLine);
    });
  }

  async runReadMemo() {
    const choices = await this.buildChoices();
    const prompt = await this.buildPrompt('see', choices);

    const id = await prompt.run();
    const memo = await this.memory.selectMemo(id);
    console.log(memo.content);
  }

  async runDeleteMemo() {
    const choices = await this.buildChoices();
    const prompt = await this.buildPrompt('delete', choices);

    const id = await prompt.run();
    const memo = await this.memory.selectMemo(id);
    await this.memory.deleteMemo(id);
    console.log(`${memo.firstLine} を削除しました`);
  }

  runInsertMemo() {
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
      console.log(`${memo.firstLine} を追加しました`);
    });
  }

  buildPrompt(operation, choices) {
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
