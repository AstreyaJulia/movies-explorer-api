const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const errorsHandler = require('./utils/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsAllow = require('./middlewares/cors');
const routes = require('./routes/index');
const rateLimiter = require('./utils/rateLimit');

/** Чтение env-переменных из .env-файла */
require('dotenv').config();

/** Порт для прослушивания */
const { PORT = 3001 } = process.env;
const app = express();

/** Логгер запросов */
app.use(requestLogger);

/** Настройки CORS */
app.use(corsAllow);

/** bodyParser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** HTTP-заголовки */
app.use(helmet());

/** Органичитель кол-ва запросов. Защита от DDoS */
app.use(rateLimiter);

/** Коннект к MongoDB */
mongoose.connect(process.env.BD_CONNECT_URL);

/** Роутинг */
app.use(routes);

/** Логгер ошибок */
app.use(errorLogger);

/** Обработчик ошибок Celebrate */
app.use(errors());

/** Обработчик ошибок */
app.use(errorsHandler);

/** Прослушиватель запросов */
app.listen(PORT);
