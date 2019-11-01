const express = require('express');
const router = express.Router();
const filmesController = require('./controller/filmesController');

router.get('/filmes', filmesController.get);
router.get('/filmes/:diretor', filmesController.getByDirector);
router.get('/filmes/:genero', filmesController.getByGenre);

router.post('/filmes', filmesController.post);
router.post('/filmes/:titulo/genero', filmesController.postGenreToMovie);





module.exports = router;