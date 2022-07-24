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
        .max(30),
      email: Joi.string()
        .min(3)
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});

/** Валидация cardId для операций с карточками */
const idMovieValidation = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
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
    }),
});

/** Валидация полей создания карточки */
const createMovieValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      link: Joi.string()
        .required()
        .pattern(URL_REG_EXP),
    }),
});

module.exports = {
  signinValidation,
  signupValidation,
  updateProfileValidation,
  createMovieValidation,
  idMovieValidation,
};
