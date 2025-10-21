const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");

require("dotenv").config(); // Ler as variáveis do arquivo .env

const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL, {
    minPoolSize: 10,
    socketTimeoutMS: 60000
})
    .then(() => {
        console.log("Conectado ao MongoDB! Aeeee!!");
    })
    .catch(error => {
        console.log("Deu zica na conexão!");
        console.log(error);
    })

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const controleRouter = require('./routes/controle');
const { error } = require('console');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/controles', controleRouter);

module.exports = app;
