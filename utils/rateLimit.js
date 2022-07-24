const rateLimit = require('express-rate-limit');

/** Настройки ограничителя запросов
 * @type {Object}
 */
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Ограничивать на 100 запросов от одного IP на `window` (пред. значение)
  standardHeaders: true, // Возвращаем информацию о лимите в заголовки `RateLimit-*`
  legacyHeaders: false, // Блокируем заголовки `X-RateLimit-*`
});

module.exports = rateLimiter;
