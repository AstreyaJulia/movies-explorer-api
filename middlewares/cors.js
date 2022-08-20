/** URL, с которых разрешены кросс-доменные запросы
 * @type {string[]}
 */
const allowedUrl = [
  'https://julialatyshevadoploma.nomoredomains.xyz',
  'http://julialatyshevadoploma.nomoredomains.xyz',
  'https://api.julialatyshevadoploma.nomoredomains.xyz',
  'http://api.julialatyshevadoploma.nomoredomains.xyz',
  'localhost:3000',
  'http://localhost:3000',
  'https://localhost:3000',
];

/** Простые CORS-запросы */
module.exports = (req, res, next) => {
  /** Сохраняем origin (источник) запроса */
  const { origin } = req.headers;

  res.header('Access-Control-Allow-Credentials', true);

  /** Если источник есть в разрешенных */
  if (allowedUrl.includes(origin)) {
    /** Устанавливаем заголовок, разрешающий браузеру запросы с этого источника */
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
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
    res.header('Access-Control-Allow-Credentials', true);
    /** завершаем обработку запроса и возвращаем результат клиенту */
    res.end();
    return;
  }
  next();
};
