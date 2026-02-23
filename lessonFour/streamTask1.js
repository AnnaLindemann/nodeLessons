// Задание 3

// Чтение большого файла с использованием потоков

// 1.	Создайте новый файл для скрипта, например, `streamTask1.js`.

// 2.	Импортируйте модуль `fs`.

// 3.	Создайте или найдите большой текстовый файл, например, `largeFile.txt`, и поместите его в ту же директорию, что и скрипт.

// 4.	Используйте метод `fs.createReadStream` для создания потока чтения из файла `largeFile.txt`.

// 5.	Подпишитесь на события потока:

// `data`: чтобы обрабатывать каждый фрагмент данных, прочитанный из файла.
// `end`: чтобы определить, когда чтение файла завершено.
// `error`: чтобы обрабатывать возможные ошибки.

// 6.	Выводите каждый фрагмент данных на консоль.

// 7.	После завершения чтения файла выведите 
const fs = require("fs")

const readStream = fs.createReadStream("largeFile.txt","utf-8")
readStream.on("data",(part) => {
  console.log("Get a part from the text", part)
})
readStream.on("end",() => {
  console.log("Reading is finished")
})
readStream.on("error",(err) => {
  console.log("Error while reading", err)
})