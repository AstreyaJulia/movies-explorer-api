const jwt = require('jsonwebtoken');
const { STATUS } = require('../utils/constants/status');
const AuthError = require('../errors/auth-error');
const { DEVELOPMENT_ENV } = require('../utils/constants/development-env');

/** Чтение env-переменных из .env-файла */
require('dotenv').config();

/** Тип окружения, секретный ключ для генерации токена из .env-файла */
const { NODE_ENV, JWT_SECRET_KEY } = process.env;

/** Проверяет наличие токена авторизации и его валидность в заголовках запроса
 * @param req - запрос
 * @param res - ответ
 * @param next
 */
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  /** Если заголовок authorization не передан или не начинается с 'Bearer ' */
  if (!authorization || !authorization.startsWith('Bearer ')) throw new AuthError(STATUS.AUTH_REQUIRED);

  /** Удаляем 'Bearer ' из заголовка */
  const token = authorization.replace('Bearer ', '');
  let payload;

  /** Верификация токена по секретному ключу.
   * Если нет env-файла, устанавливаются значения по-умолчанию */
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === DEVELOPMENT_ENV.ENV_TYPE
        ? JWT_SECRET_KEY
        : DEVELOPMENT_ENV.DEVELOPMENT_SECRET_KEY,
    );
  } catch (error) {
    throw new AuthError(STATUS.AUTH_REQUIRED);
  }

  req.user = payload;
  next();
};

module.exports = {
  auth,
};
