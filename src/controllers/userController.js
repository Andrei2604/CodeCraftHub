// Импортируем необходимые модули
const User = require('../models/User'); // Модель пользователя
const bcrypt = require('bcryptjs'); // Библиотека для хеширования паролей
const jwt = require('jsonwebtoken'); // Библиотека для работы с JSON Web Tokens

// Регистрация пользователя
/**
 * Обработчик для регистрации нового пользователя.
 * Хеширует пароль и сохраняет пользователя в базе данных.
 * 
 * @async
 * @function registerUser
 * @param {Object} req - Объект запроса от клиента, содержащий данные пользователя.
 * @param {Object} res - Объект ответа, используемый для отправки результата клиенту.
 * @returns {Promise<void>} 
 */
exports.registerUser = async (req, res) => {
    const { username, password, email } = req.body; // Извлекаем данные из тела запроса
    try {
        // Хешируем пароль с помощью bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        // Создаем нового пользователя
        const newUser = new User({ username, password: hashedPassword, email });
        // Сохраняем пользователя в базе данных
        await newUser.save();
        res.status(201).json({ message: 'User registered' }); // Возвращаем успешный ответ
    } catch (error) {
        // Обрабатываем ошибки и возвращаем ответ с ошибкой
        res.status(500).json({ message: 'Error registering user' });
    }
};

// Аутентификация пользователя
/**
 * Обработчик для аутентификации пользователя.
 * Проверяет учетные данные и возвращает токен, если они верны.
 * 
 * @async
 * @function loginUser
 * @param {Object} req - Объект запроса от клиента, содержащий учетные данные пользователя.
 * @param {Object} res - Объект ответа, используемый для отправки результата клиенту.
 * @returns {Promise<void>} 
 */
exports.loginUser = async (req, res) => {
    const { username, password } = req.body; // Извлекаем учетные данные из тела запроса
    try {
        // Ищем пользователя по имени пользователя
        const user = await User.findOne({ username });
        // Проверяем, существует ли пользователь и совпадает ли пароль
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Неверные учетные данные
        }
        // Создаем JWT-токен с идентификатором пользователя
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token }); // Возвращаем токен
    } catch (error) {
        // Обрабатываем ошибки и возвращаем ответ с ошибкой
        res.status(500).json({ message: 'Error logging in' });
    }
};
