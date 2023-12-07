const argv = require("minimist")(process.argv.slice(2));
let year = argv.y;
let month = argv.m;

const today = new Date();

if (typeof year === "undefined") {
  year = today.getFullYear();
}

if (typeof month === "undefined") {
  month = today.getMonth() + 1;
}

const firstDate = new Date(Date.UTC(year, month - 1, 1));
const lastDate = new Date(Date.UTC(year, month, 0));
const days = lastDate.getDate();

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
process.stdout.write(String(" ".repeat(firstDate.getDay() * 3)));

for (let date = firstDate; date.getDate() <= days; ) {
  process.stdout.write(String(date.getDate()).padStart(2) + " ");
  if (date.getDay() == 6) {
    console.log();
  }
  date.setDate(date.getDate() + 1);
  if (date.getDate() == 1) {
    console.log();
    break;
  }
}
