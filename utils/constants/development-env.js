/** Объект для хранения конфига для режима разработки
 * @type Object
 */
const DEVELOPMENT_ENV = {
  ENV_TYPE: 'production',
  DEVELOPMENT_BD_CONNECT_URL: 'mongodb://localhost:27017/moviesdb',
  DEVELOPMENT_SECRET_KEY: 'development-secret-key',
};

module.exports = {
  DEVELOPMENT_ENV,
};
