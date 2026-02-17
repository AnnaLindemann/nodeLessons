//Создание каталога, работа с файлами внутри него, чтение содержимого каталога с использованием методов модуля `fs`.

// 1.	Создайте новый скрипт в вашем проекте, например, `app.js`.

// 2.	Импортируйте необходимые модули `fs` и `path` в ваш скрипт.

// 3.	Создайте новый каталог с именем `test` в текущей директории с использованием метода `fs.mkdir`.

// 4.	После успешного создания каталога, создайте файл с именем `example.txt` внутри каталога `test` и запишите в него текст, например, "Hello, Node.js!" с использованием метода `fs.writeFile`.

// 5.	После успешной записи файла, прочитайте содержимое каталога `test` с использованием метода `fs.readdir`.

// 6.	Выведите содержимое каталога `test` на консоль.
const fs = require("fs")
const path = require("path")

const dirPath = path.join(__dirname, "test")
const filePath = path.join(dirPath, "example.txt")

fs.mkdir(dirPath,{ recursive: true }, (err) => {
  if(err){
    console.error("Catalog was not created", err)
    return
  } console.log("Catalog was successfully created")
 

fs.writeFile(filePath, "Hello, Node.js!", "utf-8", (err) => {
  if(err) { 
    console.error("File was not created:", err)
    return
  }
  console.log("File was successfully created")


fs.readdir(dirPath, (err, files) => {
  if(err){
    console.error("Error while readding file:", err)
    return
  }
  console.log("Content of catalog:", files)
})
})
 })