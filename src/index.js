// Импортируем необходимые модули
const express = require('express'); // Библиотека для создания веб-приложений на Node.js
const connectDB = require('./config/db'); // Функция для подключения к базе данных
const userRoutes = require('./routes/userRoutes'); // Роуты для работы с пользователями
const dotenv = require('dotenv'); // Библиотека для работы с переменными окружения

// Загружаем переменные окружения из файла .env
dotenv.config();

// Создаем экземпляр приложения Express
const app = express();

// Подключаемся к базе данных
connectDB();

// Middleware для парсинга JSON в теле запросов
app.use(express.json());

// Определяем маршруты для работы с пользователями
app.use('/api/users', userRoutes); // Все маршруты, начинающиеся с /api/users, обрабатываются userRoutes

// Определяем порт, на котором будет работать сервер
const PORT = process.env.PORT || 5000;

// Запускаем сервер и слушаем указанный порт
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Выводим сообщение о запуске сервера
});
