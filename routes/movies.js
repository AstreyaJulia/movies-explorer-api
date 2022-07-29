const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidation, idMovieValidation } = require('../middlewares/validation');

/** Private */
/** Movies */
router.get('/movies/', auth, getMovies);
router.post('/movies/', auth, createMovieValidation, createMovie);
router.delete('/movies/:movieId', auth, idMovieValidation, deleteMovie);

module.exports = router;
