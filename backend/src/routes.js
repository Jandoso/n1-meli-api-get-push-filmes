const express = require('express');
const router = express.Router();
const filmesController = require('./controller/filmesController');

router.get('/filmes', filmesController.get);
router.get('/filmes/:duracao', filmesController.getMovieByDuration);
router.get('/filmes/:diretor', filmesController.getByDirector);
router.get('/filmes/:genero', filmesController.getByGenre);
router.get('/filmes/:genero/:diretor', filmesController.getByGenreAndDirector);

router.post('/filmes', filmesController.post);
router.post('/filmes/:titulo/imagem', filmesController.postImgToMovie);
router.post('/filmes/:titulo/genero', filmesController.postGenreToMovie);
// router.post('/filmes/:titulo/showtime', filmesController.postShowTime);






module.exports = router;