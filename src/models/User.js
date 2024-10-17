// Импортируем библиотеку mongoose для работы с MongoDB
const mongoose = require('mongoose');

// Определяем схему пользователя
/**
 * Схема пользователя для базы данных MongoDB.
 * Определяет структуру документов в коллекции пользователей.
 * 
 * @typedef {Object} UserSchema
 * @property {String} username - Уникальное имя пользователя (обязательно).
 * @property {String} password - Пароль пользователя (обязательно).
 * @property {String} email - Уникальный адрес электронной почты пользователя (обязательно).
 */
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Имя пользователя должно быть уникальным и обязательным
    password: { type: String, required: true }, // Пароль является обязательным полем
    email: { type: String, required: true, unique: true }, // Электронная почта должна быть уникальной и обязательной
});

// Экспортируем модель пользователя для использования в других модулях
/**
 * Модель пользователя для взаимодействия с коллекцией пользователей в базе данных.
 * 
 * @module User
 */
module.exports = mongoose.model('User', userSchema);
