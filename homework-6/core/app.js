const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const { apiRouter } = require('./routes');
const notFound = require('./routes/not-found/not-found.router');

const { PORT, URL_MONGO_DATABASE } = require('./config/config');

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
