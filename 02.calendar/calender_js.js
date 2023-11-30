/* 入力値を受け取る */
var argv = require('minimist')(process.argv.slice(2));
var year = argv.y;
var month = argv.m;

var today = new Date();

if (typeof year === 'undefined')
  year = today.getFullYear();

if (typeof month === 'undefined')
  month = today.getMonth() + 1;

/* 始まりの日と終わりの日を取得する */
var first_date = new Date(Date.UTC(year, month -1, 1))
var last_date = new Date(Date.UTC(year, month, 0))
