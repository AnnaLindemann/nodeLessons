const path = require("path")

const directory = "/home/user/documents"
const file = "example.txt"

const fullPath = path.join(directory,file);
const ext = path.extname(fullPath);
console.log(fullPath,ext)