const express = require('express');
const path = require('path');
const appPath = __dirname;
module.exports = appPath;
const router = require('./router/api.router')

const app = express();

const port = 5050;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')))

app.use('/', router);

app.listen(port, () => {
    console.log(`App listen ${port}`)
})
