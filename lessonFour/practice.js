const _ = require("lodash");
const moment = require("moment")


const now = moment().format("YYYY-MM-DD HH:mm:ss")
console.log(now)

const numbers = [1, 2, 3, 4, 5];
const shuffled = _.shuffle(numbers);
console.log(shuffled);
