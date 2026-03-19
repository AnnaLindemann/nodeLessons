import dotenv from "dotenv"
dotenv.config()
import sequelize from "./config/db.js"
import express from "express"



const PORT = process.env.PORT || 3333
const app = express()
// Используем middleware для обработки JSON в теле запроса
app.use(express.json());
// Простой массив для хранения данных (вместо базы данных)
let items = [
{ id: 1, name: 'Item One', description: 'This is item one' },
{ id: 2, name: 'Item Two', description: 'This is item two' },
];

// Маршрут для получения всех предметов (GET /items)
app.get('/items', (req, res) => {
res.json(items);
});

// Маршрут для получения конкретного предмета по ID (GET /items/:id)
app.get('/items/:id', (req, res) => {
const item = items.find(i => i.id === parseInt(req.params.id));
if (!item) return res.status(404).json({ message: 'Item not found' });
res.json(item);
});

// Маршрут для создания нового предмета (POST /items)
app.post('/items', (req, res) => {
const newItem = {
id: items.length + 1,
name: req.body.name,
description: req.body.description,
};
items.push(newItem);
res.status(201).json(newItem);
});

// Маршрут для обновления предмета (PUT /items/:id)
app.put('/items/:id', (req, res) => {
const item = items.find(i => i.id === parseInt(req.params.id));
if (!item) return res.status(404).json({ message: 'Item not found' });

item.name = req.body.name || item.name;
item.description = req.body.description || item.description;
res.json(item);
});

// Маршрут для удаления предмета (DELETE /items/:id)
app.delete('/items/:id', (req, res) => {
items = items.filter(i => i.id !== parseInt(req.params.id));
res.status(204).send();
});

app.listen(PORT,async () => {
  try {
    await sequelize.authenticate()
  console.log("Connection to the database has been established successfully!")
  console.log(`Server is running at http://localhost:${PORT}`)
} catch(err){
  console.error("Unable to connect to the database:", err)
}
})