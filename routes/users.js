const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { getUserInfo, createUser, updateProfile } = require('../controllers/users');
const { signupValidation, updateProfileValidation } = require('../middlewares/validation');

/** Private */
/** Users */
router.get('/users/me', auth, getUserInfo);
router.post('/users/', auth, signupValidation, createUser);
router.patch('/users/me', auth, updateProfileValidation, updateProfile);

module.exports = router;
