const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const { compare } = require('bcryptjs');
const { STATUS } = require('../utils/constants/status');
const AuthError = require('../errors/auth-error');

/** Схема пользователя
 * @type {Object}
 * name - имя пользователя, email - email пользователя, password - хэш пароля
 */
/*
email — почта пользователя, по которой он регистрируется.
Это обязательное поле, уникальное для каждого пользователя.
Также оно должно валидироваться на соответствие схеме электронной почты.
password — хеш пароля. Обязательное поле-строка.
Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле.
name — имя пользователя, например: Александр или Мария.
Это обязательное поле-строка от 2 до 30 символов.
 */
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      validate: {
        validator(email) {
          return isEmail(email);
        },
      },
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 2,
      select: false,
    },
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(STATUS.AUTH_FAIL);
      }
      return compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(STATUS.AUTH_FAIL);
          }
          return user;
        });
    });
};

module.exports = model('user', userSchema);
