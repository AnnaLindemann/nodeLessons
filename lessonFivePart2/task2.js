// Задание 2

// Настройка заголовков и использование внешней библиотеки moment

// 1.	Создание сервера:

// Импортируйте модули `http` и `moment`.
// Создайте сервер с использованием метода `http.createServer()`.

// 2.	Получение текущей даты и времени:

// В функции обратного вызова для сервера используйте библиотеку `moment` для получения текущей даты и времени в формате `YYYY-MM-DD HH:mm:ss`.

// 3.	Настройка заголовков:

// Установите статус ответа `200`.
// Установите заголовок `Content-Type` в `text/plain`.
// Установите заголовок `Cache-Control` со значением `public, max-age=3600`.

// 4.	Отправка ответа:

// Отправьте текстовый ответ с текущей датой и временем.

// 5.	Запуск сервера:

// Настройте сервер на прослушивание порта `3000`.
// Добавьте сообщение в консоль, которое будет выводиться при успешном запуске сервера.

import http from "http";
import moment from "moment";

const port = 3333

const server = http.createServer((req,res) => {

const now = moment()
res.statusCode = 200
res.setHeader("Content-Type", "text/plain")
res.setHeader("Cache-Control","public, max-age=3600")
res.end(now.format("YYYY-MM-DD HH:mm:ss" )) 
})

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})