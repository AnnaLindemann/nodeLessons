const fs = require("fs")

const readStream = fs.createReadStream("input1.txt", "utf-8")
const writeStream = fs.createWriteStream("output2.txt", "utf-8")

readStream.pipe(writeStream)

writeStream.on("finish", () => {
  console.log("file was cpoied")
})

readStream.on("error", (error) => {
  console.error("Error when reading file:", error)
})

writeStream.on("error", (error) => {
  console.error("Error when reading file:", error)
})