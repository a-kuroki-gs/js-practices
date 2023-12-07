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

const firstDate = new Date(year, month - 1, 1);

console.log(`      ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
process.stdout.write(String(" ".repeat(firstDate.getDay() * 3)));

const nextMonth = new Date(year, month, 1);
for (let date = firstDate; date < nextMonth; date.setDate(date.getDate() + 1)) {
  process.stdout.write(String(date.getDate()).padStart(2) + " ");
  if (date.getDay() == 6) {
    console.log();
  }
}

console.log();
