const router = require('express').Router();
const { signinValidation, signupValidation } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');

/** Public */
router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);

module.exports = router;
