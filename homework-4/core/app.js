const express = require('express');
const mongoose = require('mongoose');

const { apiRouter } = require('./router');

const app = express();

_connectDB();

const port = 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(port, () => {
    console.log(`App listen ${port}`);
});

function _connectDB() {
    mongoose.connect('mongodb://localhost/hw-4', { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
