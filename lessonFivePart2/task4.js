// Задание 4

// Обработка событий с использованием EventEmitter

// 1.	Создание EventEmitter:

// Импортируйте модуль `events`.
// Создайте экземпляр EventEmitter.

// 2.	Создание сервера:

// Импортируйте модуль `http`.
// Создайте сервер с использованием метода `http.createServer()`.

// 3.	Обработка запросов:

// В функции обратного вызова для сервера вызывайте событие `requestReceived` и передавайте информацию о запросе (метод и URL).
// Используйте метод `on()` для обработки события `requestReceived` и логируйте информацию о запросе в консоль.

// 4.	Формирование ответа:

// Установите статус ответа `200`.
// Установите заголовок `Content-Type` в `text/plain`.
// Отправьте текстовый ответ с сообщением "Событие обработано".

// 5.	Запуск сервера:

// Настройте сервер на прослушивание порта `3000`.
// Добавьте сообщение в консоль, которое будет выводиться при успешном запуске сервера.
import http from "http"
import dotenv from "dotenv"
import EventEmitter from "events"
const emmiter = new EventEmitter()

dotenv.config()
const port = process.env.PORT

emmiter.on("requestReceived",(method, url) => {
  console.log(`Request: ${method}, ${url}`)
}) 

const server = http.createServer((req,res) => {
emmiter.emit("requestReceived", req.method, req.url)
res.statusCode = 200
res.setHeader("Content-Type", "text/plain,charset=utf-8")
res.end("Request handled")
})

server.on("error", (err) => {
  console.error("Error", err.message)
})


server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})