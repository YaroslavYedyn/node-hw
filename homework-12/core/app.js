const express = require('express');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv')
    .config();
const path = require('path');
const morgan = require('morgan');

const { apiRouter, notFound } = require('./routes');
const { sequelize } = require('./dataBase');
const { PORT } = require('./config/config');
const cronRun = require('./cron-jobs');
const logger = require('./logger')();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'homework-11', 'core', 'static')));

app.use('/', apiRouter);
app.use('*', notFound);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    logger.error({
        message: err.message,
        code: err.customCode
    });
    res
        .status(err.status || 500)
        .json({
            customCode: err.customCode || 0,
            message: err.message || ''
        });
});

sequelize.sync({ alter: true })
    .then(() => app.listen(PORT, () => {
        console.log(`App listen ${PORT}`);
        cronRun();
    }));

console.log(dotenv);
