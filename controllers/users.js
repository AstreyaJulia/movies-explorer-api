const { sign } = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const { STATUS } = require('../utils/constants/status');
const AuthError = require('../errors/auth-error');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const EmailExistError = require('../errors/email-exist-error');

require('dotenv').config();

/** Получить информацию о пользователе
 * @param req - запрос, /users/me, метод GET
 * @param res - ответ
 * @param next
 */
const getUserInfo = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return new NotFoundError(STATUS.USER_NOT_FOUND);
      }
      return res.send({
        data: {
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch(next);
};

/** Создать пользователя
 * @param req - запрос, /users, метод POST
 * @param res - ответ
 * @param next
 */
const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201)
      .send({
        data: {
          _id: user._id,
          name,
          email,
        },
      }))
    .catch((error) => {
      if (error.code === 11000) {
        return next(new EmailExistError(STATUS.EMAIL_EXIST));
      }
      if (error.name === 'ValidationError') {
        return next(new BadRequestError(STATUS.CREATE_USER_VALIDATION));
      }
      return next(error);
    });
};

/** Изменить информацию о пользователе
 * @param req - запрос, /users/me,
 * user._id - ID пользователя,
 * body - тело: { name - имя}, метод PATCH
 * @param res - ответ
 * @param next
 */
const updateProfile = (req, res, next) => {
  const {
    name,
  } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, {
    name,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) return new NotFoundError(STATUS.USER_NOT_FOUND);
      return res.send({
        data: {
          name: user.name,
        },
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') throw new BadRequestError(STATUS.UPDATE_PROFILE_VALIDATION);
      throw error;
    })
    .catch(next);
};

/** Вход в систему
 * @param req - запрос
 * @param res - ответ
 * @param next
 */
const login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
      // cookie
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.status(200)
        .send({ token });
    })
    .catch((error) => {
      if (error.statusCode === 401) {
        throw new AuthError(STATUS.AUTH_FAIL);
      }
      throw error;
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  createUser,
  updateProfile,
  login,
};
