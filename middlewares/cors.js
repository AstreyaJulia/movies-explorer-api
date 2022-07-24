/** URL, с которых разрешены кросс-доменные запросы
 * @type {string[]}
 */
const allowedUrl = [
  /* TODO прописать домены с http и https */
  'localhost:3000',
  'http://localhost:3000',
];

/** Простые CORS-запросы */
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  /** Сохраняем origin (источник) запроса */
  const { origin } = req.headers;

  res.header('Access-Control-Allow-Credentials', true);

  /** Если источник есть в разрешенных */
  if (allowedUrl.includes(origin)) {
    /** Устанавливаем заголовок, разрешающий браузеру запросы с этого источника */
    res.header('Access-Control-Allow-Origin', origin);
  }

  /** Перезапрос */

  /** HTTP-метод запроса */
  const { method } = req;

  /** Разрешенные методы */
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  /** Предзапрос OPTIONS */
  if (method === 'OPTIONS') {
    /** разрешаем кросс-доменные запросы любых типов */
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    /** разрешаем кросс-доменные запросы с этими заголовками */
    res.header('Access-Control-Allow-Headers', requestHeaders);
    /** завершаем обработку запроса и возвращаем результат клиенту */
    return res.end();
  }

  next();
};
