const Movie = require('../models/movies');
const { STATUS } = require('../utils/constants/status');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

/** Получить все сохранённые текущим  пользователем фильмы
 * @param req - запрос, /movies, метод GET
 * @param res - ответ
 * @param next
 * @returns {*|Promise<any>}
 */
const getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

/** Создает фильм
 * @param req - запрос, /movies,
 * {   movieId,
 *     nameEN,
 *     nameRU,
 *     thumbnail,
 *     trailerLink,
 *     image,
 *     description,
 *     year,
 *     duration,
 *     director,
 *     country
 *     },
 * user._id - ID пользователя, метод POST
 * @param res - ответ
 * @param next
 * @returns {Promise<*>}
 */
const createMovie = (req, res, next) => {
  const {
    movieId,
    nameEN,
    nameRU,
    thumbnail,
    trailerLink,
    image,
    description,
    year,
    duration,
    director,
    country,
  } = req.body;
  const { _id } = req.user;

  return Movie.create({
    movieId,
    nameEN,
    nameRU,
    thumbnail,
    trailerLink,
    image,
    description,
    year,
    duration,
    director,
    country,
    owner: _id,
  })
    .then((movie) => res.status(201)
      .send({ data: movie }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return new BadRequestError(STATUS.CREATE_MOVIE_VALIDATION);
      }
      return next(error);
    });
};

/** Удаляет фильм
 * @param req - запрос, /movies/:id,
 * params.movieId - ID фильма, метод DELETE
 * @param res - ответ
 * @param next
 */
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) throw new NotFoundError(STATUS.MOVIE_NOT_FOUND);
      if (String(movie.owner) === req.user._id) {
        return Movie.findByIdAndRemove(movieId);
      }
      throw new ForbiddenError(STATUS.DEL_MOVIE_FORBIDDEN);
    })
    .then(() => {
      res.status(200)
        .send({ message: 'Фильм удален' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequestError(STATUS.MOVIE_ID_INVALID);
      }
      throw error;
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
