var argv = require('minimist')(process.argv.slice(2));
var year = argv.y;
var month = argv.m;

var today = new Date();

if (typeof year === 'undefined')
  year = today.getFullYear();

if (typeof month === 'undefined')
  month = today.getMonth() + 1;

var first_date = new Date(Date.UTC(year, month -1, 1))
var last_date = new Date(Date.UTC(year, month, 0))
var days = last_date.getDate()

console.log(`      ${month}月 ${year}`);
console.log('日 月 火 水 木 金 土');
process.stdout.write(String(' '.repeat(first_date.getDay() * 3)));

for (var date = first_date; date.getDate() <= days; ){
  process.stdout.write(String(date.getDate()).padStart(2) + ' ');
  if (date.getDay() == 6)
    console.log();
  date.setDate(date.getDate() + 1)
  if (date.getDate() == 1){
    console.log();
    break;
  }
}
