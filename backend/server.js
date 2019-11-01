const express = require('express');
const app = express();
const port = 3000;
const router = require('./src/routes');

app.use(express.json());

app.all('*', (req, res, next) => {
    next();
});

app.use(router);

app.listen(port, (err) => {
    if(err){
        console.log('Houve um erro ao iniciar o servidor!');
    }else{
        console.log(`O servidor está rodando na porta ${port}`);
    };
});
