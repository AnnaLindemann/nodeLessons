// Задание 1

// Использование axios для получения списка постов и их записи в файл

// 1.	Создайте новый проект:

// В терминале перейдите в каталог, где хотите создать проект.
// Запустите команду `npm init -y`, чтобы создать файл `package.json`.

// 2.	Установите axios:

// Выполните команду `npm install axios`.

// 3.	Создайте файл `posts.js`:

// Создайте файл `posts.js` в корневом каталоге проекта.

// 4.	Импортируйте модули `fs` и `axios`:

// Откройте файл `posts.js` в текстовом редакторе.
// Импортируйте модули `fs` и `axios`.

// 5.	Настройте GET-запрос к JSONPlaceholder API для получения списка постов:

// Настройте GET-запрос к URL `https://jsonplaceholder.typicode.com/posts`.

// 6.	Запишите результаты запроса в текстовый документ:

// Используйте модуль `fs` для записи результатов запроса в файл `posts.txt`.

// 7.	Прочтите содержимое файла и выведите его в консоль:

// Используйте модуль `fs` для чтения содержимого файла `posts.txt` и вывода его в консоль.

// 8.	Запустите скрипт командой `node posts.js`.
const fs = require("fs")
const axios = require("axios")

async function getPosts(){
  try{
 const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
 const posts = response.data
 console.log(posts)
  } catch(err){
    console.errror("Failed to download posts", err.message)
  }
}

getPosts()