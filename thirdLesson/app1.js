const fs = require("fs")


const readStream = fs.createReadStream("input.txt",{
  encoding: "utf8",
  highWaterMark: 20
});

readStream.on("data", (chunk) => {
  console.log("Got chunk", chunk);
})
readStream.on("end",() => {
  console.log("End of readingStream")
})

readStream.on("error", (err) => {
  console.log("error whole reading stream:", err)
})