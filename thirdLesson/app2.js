const fs = require("fs")

const writeStream = fs.createWriteStream("output1.tst", "utf-8")
writeStream.write("This is 1 line")
writeStream.write("This is 2 line")
writeStream.write("This is 3 line")
writeStream.write("This is 4 line")

  writeStream.end("End of lines")
writeStream.on("finish", () => {
  console.log("File was written")
})
writeStream.on("error", (error) => {
  console.error*"Error while writting file:", error
})