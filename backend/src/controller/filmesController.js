const filmes = require('../model/filmes.json');
const fs = require('fs');

exports.get = (req, res) => {
    res.status(200).send(filmes);
};

exports.getByGenre = (req, res) => {
    const genre = req.params.genero;
    const moviesGenre = filmes.filter(filme => filme.genre.indexOf(genre) > -1);
    res.status(200).send(moviesGenre);
};

exports.getByDirector = (req, res) => {
    const director = req.params.diretor.split('-').join(' ');
    const moviesDirector = filmes.filter(filme => filme.director == director);
    res.status(200).send(moviesDirector);
};


exports.post = (req, res) => {
    const { title, year, director, duration, genre, rate } = req.body;
    filmes.push({ title, year, director, duration, genre, rate });

    fs.writeFile('./src/model/filmes.json', JSON.stringify(filmes), "utf8", function(err){
        if(err){
            return res.status(500).send({ message: err });
        }
        console.log("O arquivo foi salvo com sucesso");
    })

    return res.status(201).send(filmes);
};

exports.postGenreToMovie = (req, res) => {
   const titulo = req.params.titulo.split('-').join(' ');
    const filme = filmes.find(filme => filme.title == titulo);
    if(!titulo){
        res.send("Não encontramos este filme!");
    }

    const { genre } = req.body;
    filme.genre.push( genre );

    fs.writeFile('./src/model/filmes.json', JSON.stringify(filme), "utf8", function(err){
        if(err){
            return res.status(500).send({ message: err });
        }
        console.log("O arquivo foi salvo com sucesso");
    })

    res.status(201).send(filme);

};
