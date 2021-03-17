const express = require('express');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');

const { apiRouter, notFound } = require('./routes');

const { PORT, URL_MONGO_DATABASE } = require('./config/config');

const app = express();

_connectDB();

app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'homework-8', 'core', 'static')));

app.use('/', apiRouter);
app.use('*', notFound);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            customCode: err.customCode || 0,
            message: err.message || ''
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

console.log(dotenv);

function _connectDB() {
    mongoose.connect(URL_MONGO_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
