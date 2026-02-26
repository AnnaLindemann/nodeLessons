// Задание 3

// Использование переменных окружения

// 1.	Настройка переменных окружения:

// Создайте файл `.env` в корне проекта.
// Добавьте в него переменные `PORT=3000` и `MESSAGE="Привет от сервера"`.

// 2.	Подключение и использование переменных окружения:

// Импортируйте модуль `dotenv` и вызовите `dotenv.config()`.
// Получите значения переменных окружения `PORT` и `MESSAGE`.

// 3.	Создание сервера:

// Импортируйте модуль `http`.
// Создайте сервер с использованием метода `http.createServer()`.

// 4.	Формирование ответа:

// Установите статус ответа `200`.
// Установите заголовок `Content-Type` в `text/plain`.
// Отправьте текстовый ответ с сообщением из переменной окружения `MESSAGE`.

// 5.	Запуск сервера:

// Настройте сервер на прослушивание порта из переменной окружения `PORT`.
// Добавьте сообщение в консоль, которое будет выводиться при успешном запуске сервера.
import http  from "http"
import dotenv from "dotenv"

dotenv.config()
const port = process.env.PORT
const message = process.env.MESSAGE

const server = http.createServer((req,res) => {
  try {res.statusCode = 200
  res.setHeader("Content-Type", "text/plain; charset=utf-8")
  res.end(message)
} catch(err){
  res.statusCode = 500
  res.setHeader("Content-Type", "text/plain");
    res.end("Internal Server Error");
    console.error("Request failed:", err);
}})

server.listen(port, ()=> {
  console.log(`Server is running at http://localhost:${port}`)
})