const { Sequelize } = require('sequelize');

const { URL_SQL, PASSWORD_SQL, LOGIN_SQL } = require('../config/config');

module.exports.sequelize = new Sequelize(URL_SQL, LOGIN_SQL, PASSWORD_SQL, {
    host: 'localhost',
    dialect: 'mysql'
});
