const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { signOut } = require('../controllers/users');

/** Private */
router.get('/signout', auth, signOut);

module.exports = router;
