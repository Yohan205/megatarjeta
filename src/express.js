// import fetchApi from 'node-fetch';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const { PORT } = require("./config");
const app = express();

// Settings
app.set('port', PORT || 80);

//Middlewares
app.use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(morgan('dev'));

//Routers
app.get('/', (req, res) => {
    res.send('ONLINE')
})
app.use("/api", require("../routes/api.routes"));

module.exports = app;