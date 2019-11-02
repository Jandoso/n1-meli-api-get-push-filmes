const filmes = require('../model/filmes.json');
const fs = require('fs');

exports.get = (req, res) => {
    res.status(200).send(filmes);
};

exports.getByGenre = (req, res) => {
    const genre = req.params.genero;
    const moviesGenre = filmes.filter(filme => filme.genre.indexOf(genre) > -1);
    res.status(200).send(moviesGenre);

    //possível fazer com includes, por exemplo
};

exports.getByDirector = (req, res) => {
    const director = req.params.diretor.split('-').join(' ');
    const moviesDirector = filmes.filter(filme => filme.director == director);
    res.status(200).send(moviesDirector);
};

exports.getByGenreAndDirector = (req, res) => {
    const genre = req.params.genero;
    const director = req.params.diretor.split('-').join(' ');
    const moviesGenre = filmes.filter(filme => filme.genre.indexOf(genre) > -1);
    const moviesGenreDirector = moviesGenre.filter(filme => filme.director == director);
    res.status(200).send(moviesGenreDirector);
};

function transformeMovieDurationToMinutes(duration){
    const duracaoApenasNumeros = duration.split("").filter(Number);
    const hora = duracaoApenasNumeros.shift()*60;
    const minutos = duracaoApenasNumeros.join("");
    const duracaoEmMinutos = hora + parseInt(minutos);
};

exports.getMovieByDuration = (req, res) => {
    const duracao = req.params.duracao;
    const novaListaDeFilmes = JSON.parse(JSON.stringify(filmes));

    novaListaDeFilmes.map(filme => filme.duration = transformeMovieDurationToMinutes(filme.duration));


    const duracaoFilmes = novaListaDeFilmes.filter(filme => filme.duration > duracao);
   
    res.status(200).send(novaListaDeFilmes);
};


exports.post = (req, res) => {
    const { title, year, director, duration, genre, rate } = req.body;
    filmes.push({ title, year, director, duration, genre, rate });

    fs.writeFile('./src/model/filmes.json', JSON.stringify(filmes), "utf8", function (err) {
        if (err) {
            return res.status(500).send({ message: err });
        }
        console.log("O arquivo foi salvo com sucesso");
    })

    return res.status(201).send(filmes);
};

exports.postGenreToMovie = (req, res) => {
    const titulo = req.params.titulo.split('-').join(' ');
    const filme = filmes.find(filme => filme.title == titulo);
    if (!titulo) {
        res.send("Não encontramos este filme!");
    }    
    const { genre } = req.body;
    filme.genre.push(genre);

    fs.writeFile('./src/model/filmes.json', JSON.stringify(filme), "utf8", function (err) {
        if (err) {
            return res.status(500).send({ message: err });
        }
        console.log("O arquivo foi salvo com sucesso");
    })
    res.status(201).send(filmes);
};

exports.postImgToMovie = (req, res) => {
    const titulo = req.params.titulo;
    const filme = filmes.find(filme => filme.title == titulo);
    if (!titulo) {
        res.send("Não encontramos este filme!");
    }    

    const { image } = req.body;
    filme.image = image;

    res.status(201).send(filmes);
};

exports.postShowTime = (req, res) => {
    const titulo = req.params.titulo;
    const filme = filmes.find(filme => filme.title == titulo);
    if (!titulo) {
        res.send("Não encontramos este filme!");
    }    

    const { showTime } = req.body;
    filme.showTime = showTime;

    res.status(201).send(filmes);
};



