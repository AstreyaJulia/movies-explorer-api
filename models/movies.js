const mongoose = require('mongoose');
const validator = require('validator');

/** Схема фильма
 * @type {Object}
 */
/*
`country` — страна создания фильма. Обязательное поле-строка.
`director` — режиссёр фильма. Обязательное поле-строка.
`duration` — длительность фильма. Обязательное поле-число.
`year` — год выпуска фильма. Обязательное поле-строка.
`description` — описание фильма. Обязательное поле-строка.
`image` — ссылка на постер к фильму. Обязательное поле-строка. URL-адрес.
`trailerLink` — ссылка на трейлер фильма. Обязательное поле-строка. URL-адрес.
`thumbnail` — миниатюрное изображение постера к фильму. Обязательное поле-строка. URL-адрес.
`owner` — _id пользователя, который сохранил фильм. Обязательное поле.
`movieId` — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
`nameRU` — название фильма на русском языке. Обязательное поле-строка.
`nameEN` — название фильма на английском языке. Обязательное поле-строка.
 */
const movieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
    min: 1,
    max: 99,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
    },
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2000,
  },
  year: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 300,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  country: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
});

module.exports = mongoose.model('movie', movieSchema);
