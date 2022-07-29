const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const { STATUS } = require('../utils/constants/status');
const authorization = require('./authorization');
const movies = require('./movies');
const users = require('./users');
const signout = require('./signout');

/** Public */
router.use(authorization);

/** Private */
router.use(movies);
router.use(users);
router.use(signout);

/** Любые маршруты, не подходящие под имеющиеся роуты, вызовут статус 404 */
router.use(auth, (req, res, next) => {
  next(new NotFoundError(STATUS.NOT_FOUND));
});

module.exports = router;
