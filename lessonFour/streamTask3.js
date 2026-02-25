// Копирование файла с использованием потоков

// 1.	Создайте новый файл для скрипта, например, `streamTask3.js`.

// 2.	Импортируйте модуль `fs`.

// 3.	Создайте или найдите файл, который хотите скопировать, например, `sourceFile.jpg`, и поместите его в ту же директорию, что и скрипт.

// 4.	Используйте метод `fs.createReadStream` для создания потока чтения из файла `sourceFile.jpg`.

// 5.	Используйте метод `fs.createWriteStream` для создания потока записи в новый файл, например, `destinationFile.jpg`.

// 6.	Используйте метод `pipe` для соединения потока чтения с потоком записи, чтобы данные автоматически передавались от одного к другому.

// 7.	Подпишитесь на события потока записи:

// `finish`: чтобы определить, когда копирование данных завершено.
// `error`: чтобы обрабатывать возможные ошибки.

// 8.	После завершения копирования файла выведите сообщение о завершении операции.

const fs = require("fs")

const readStream = fs.createReadStream("sourceFile.jpg")
const writeStream = fs.createWriteStream("destinationFile.jpg")

readStream.pipe(writeStream)
writeStream.on("finish", () => {
  console.log("Writing finished")
})
readStream.on("error", (error) => {
  console.error("Reading failed", error)
})

writeStream.on("error", (error) => {
  console.error("Writing failed", error)
})

