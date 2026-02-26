// Задание 1

// Логирование запросов в файл
// 1.	Создание сервера:

// Импортируйте модули `http` и `fs`.
// Создайте сервер с использованием метода `http.createServer()`.

// 2.	Логирование информации о запросе:

// В функции обратного вызова для сервера логируйте метод запроса (`req.method`), URL (`req.url`) и текущую дату/время в текстовый файл.
// Используйте метод `fs.appendFile()` для добавления логов в файл `requests.log`.

// 3.	Формирование ответа:

// Установите статус ответа `200`.
// Установите заголовок `Content-Type` в `text/plain`.
// Отправьте текстовый ответ с сообщением "Запрос залогирован".

// 4.	Запуск сервера:

// Настройте сервер на прослушивание порта `3000`.
// Добавьте сообщение в консоль, которое будет выводиться при успешном запуске сервера.
import http from "http";
import fs from "fs";
// const port = 3333;


const server = http.createServer((req, res) => {
  const data = `${new Date().toISOString()} ${req.method} ${req.url}`
fs.appendFile("requests.log", data,"utf-8", (err) => {
  if(err){
    res.statusCode = 500;
      res.end("Log error");
      return
  }
   res.statusCode = 200; 
  res.setHeader("Content-Type", "text/plain")
  res.end("Request is logged")
})
})

server.listen(port, () => {
  console.log(`Server is running at http://172.18.133.209:${port}`)
})