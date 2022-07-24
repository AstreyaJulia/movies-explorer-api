const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { signinValidation } = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-error');
const { STATUS } = require('../utils/constants/status');
const { login } = require('../controllers/users');

const {
  createUser,
  updateProfile,
  getUserInfo,
} = require('../controllers/users');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  signupValidation,
  updateProfileValidation,
  createMovieValidation,
  idMovieValidation,
} = require('../middlewares/validation');

/** Private */
/** Users */
router.get('/users/me', auth, getUserInfo);
router.post('/users/', auth, signupValidation, createUser);
router.patch('/users/me', auth, updateProfileValidation, updateProfile);
/* TODO роут /signout удаляющий куку app.post('/signout', auth, signOut); */
/** Movies */
router.get('/movies/', auth, getMovies);
router.post('/movies/', auth, createMovieValidation, createMovie);
router.delete('/movies/:movieId', auth, idMovieValidation, deleteMovie);

/** Public */
router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);

/** Любые маршруты, не подходящие под имеющиеся роуты, вызовут статус 404 */
router.use(auth, (req, res, next) => {
  next(new NotFoundError(STATUS.NOT_FOUND));
});

module.exports = router;
