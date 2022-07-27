/** Celebrate-валидатор */
const {
  celebrate,
  Joi,
} = require('celebrate');
const { URL_REG_EXP } = require('../utils/constants/url-regexp');

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
        .min(2)
        .max(100),
      email: Joi.string()
        .min(3)
        .required()
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
        .max(100),
    }),
});

/** Валидация полей создания карточки */
const createMovieValidation = celebrate({
  body: Joi.object()
    .keys({
      movieId: Joi.number()
        .required()
        .min(1)
        .max(99),
      nameEN: Joi.string()
        .required()
        .min(2)
        .max(200),
      nameRU: Joi.string()
        .required()
        .min(2)
        .max(200),
      thumbnail: Joi.string()
        .required()
        .pattern(URL_REG_EXP),
      trailer: Joi.string()
        .required()
        .pattern(URL_REG_EXP),
      image: Joi.string()
        .required()
        .pattern(URL_REG_EXP),
      description: Joi.string()
        .required()
        .min(2)
        .max(2000),
      year: Joi.string()
        .required()
        .min(4)
        .max(4),
      duration: Joi.number()
        .required()
        .min(1)
        .max(300),
      director: Joi.string()
        .required()
        .min(2)
        .max(100),
      country: Joi.string()
        .required()
        .min(3)
        .max(100),
    }),
});

module.exports = {
  signinValidation,
  signupValidation,
  updateProfileValidation,
  createMovieValidation,
  idMovieValidation,
};
