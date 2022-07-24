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
const getMovies = (req, res, next) => Movie.find({})
  .then((movies) => res.send({ data: movies }))
  .catch(next);

/** Создает фильм
 * @param req - запрос, /movies,
 * {   movieId,
 *     nameEN,
 *     nameRU,
 *     thumbnail,
 *     trailer,
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
    trailer,
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
    trailerLink: trailer,
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
    // eslint-disable-next-line
    .then((movie) => {
      if (!movie) throw new NotFoundError(STATUS.MOVIE_NOT_FOUND);
      if (String(movie.owner) === req.user._id) {
        Movie.findByIdAndRemove(movieId)
          .then(() => {
            res.status(200)
              .send({ message: 'Фильм удален' });
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              throw new BadRequestError(STATUS.MOVIE_ID_INVALID);
            }
            throw err;
          });
      } else {
        throw new ForbiddenError(STATUS.DEL_MOVIE_FORBIDDEN);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(STATUS.MOVIE_ID_INVALID);
      }
      throw err;
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
