// Импортируем необходимые библиотеки
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Загружаем переменные окружения из файла .env
dotenv.config();

/**
 * Функция для подключения к базе данных MongoDB.
 * Использует переменную окружения MONGODB_URI для подключения.
 * 
 * @async
 * @function connectDB
 * @returns {Promise<void>} 
 * @throws {Error} Если подключение не удалось, выводится ошибка и приложение завершает работу.
 */
const connectDB = async () => {
    try {
        // Подключаемся к MongoDB с указанными опциями
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true, // Используем новый парсер URL
            useUnifiedTopology: true, // Включаем новый механизм обработки подключений
        });
        console.log('MongoDB Connected'); // Подтверждение успешного подключения
    } catch (error) {
        // Обрабатываем ошибку подключения
        console.error('MongoDB connection error:', error);
        process.exit(1); // Завершаем приложение при ошибке подключения
    }
};

// Экспортируем функцию connectDB для использования в других модулях
module.exports = connectDB;
