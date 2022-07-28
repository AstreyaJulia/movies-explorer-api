/** Celebrate-валидатор */
const {
  celebrate,
  Joi,
} = require('celebrate');
const validator = require('validator');
const { STATUS } = require('../utils/constants/status');

/** Валидация полей входа пользователя */
const signinValidation = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .min(3)
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});

/** Валидация полей регистрации пользователя */
const signupValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      email: Joi.string()
        .required()
        .min(3)
        .email(),
      password: Joi.string()
        .required(),
    }),
});

/** Валидация cardId для операций с фильмами */
const idMovieValidation = celebrate({
  params: Joi.object()
    .keys({
      movieId: Joi.string()
        .hex()
        .length(24),
    }),
});

/** Валидация полей обновления профиля пользователя */
const updateProfileValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      email: Joi.string()
        .min(3)
        .required()
        .email(),
    }),
});

/** Валидация полей создания фильма */
const createMovieValidation = celebrate({
  body: Joi.object()
    .keys({
      movieId: Joi.number()
        .required()
        .min(1),
      nameEN: Joi.string()
        .required()
        .min(2),
      nameRU: Joi.string()
        .required()
        .min(2),
      thumbnail: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(STATUS.CREATE_MOVIE_VALIDATION);
      }),
      trailerLink: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(STATUS.CREATE_MOVIE_VALIDATION);
      }),
      image: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(STATUS.CREATE_MOVIE_VALIDATION);
      }),
      description: Joi.string()
        .required()
        .min(2),
      year: Joi.string()
        .required()
        .min(4),
      duration: Joi.number()
        .required()
        .min(1),
      director: Joi.string()
        .required()
        .min(2),
      country: Joi.string()
        .required()
        .min(3),
    }),
});

module.exports = {
  signinValidation,
  signupValidation,
  updateProfileValidation,
  createMovieValidation,
  idMovieValidation,
};
