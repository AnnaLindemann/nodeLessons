const moment = require("moment");

const now = moment();
const format1 = now.format("DD-MM-YYYY");
const format2 = now.format("MMM Do YY");
const format3 = now.format("dddd");

console.log(format1);
console.log(format2);
console.log(format3);