// Задание 5

// Работа с заголовками и обработка POST-запросов

// 1.	Создание сервера:

// Импортируйте модуль `http`.
// Создайте сервер с использованием метода `http.createServer()`.

// 2.	Обработка POST-запросов:

// В функции обратного вызова для сервера проверяйте метод запроса (`req.method`) и URL (`req.url`).
// Если метод запроса `POST` и URL `/submit`, логируйте тело запроса в консоль. Используйте события `data` и `end` для чтения данных из запроса.

// 3.	Настройка заголовков:

// Установите заголовок `Access-Control-Allow-Origin` со значением `*`.
// Установите заголовок `Content-Type` в `application/json`.

// 4.	Формирование ответа:

// Установите статус ответа `200`.
// Отправьте JSON-ответ с сообщением "POST-запрос обработан".

// 5.	Запуск сервера:

// Настройте сервер на прослушивание порта `3000`.
// Добавьте сообщение в консоль, которое будет выводиться при успешном запуске сервера.
import http from "http"
import dotenv from "dotenv"

dotenv.config()
const port = process.env.PORT

const server = http.createServer((req,res) => { 
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Content-Type", "application/json")

if(req.method === "POST" && req.url === "/submit"){
  let body = ""
    req.on("data", (chunk)=> {
      body = body + chunk    
    })
    req.on("end", () => {
       console.log(body)
    res.statusCode = 200
    res.end(JSON.stringify({ message: "POST request processed"}))
  }) 
  return
} 
     res.statusCode = 405;
    res.end(JSON.stringify({ message: "Method not allowed"}));

})

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})