const { LOGIN_SQL, URL_SQL, PASSWORD_SQL } = require('./config');

module.exports = {
    development: {
        username: LOGIN_SQL,
        password: PASSWORD_SQL,
        database: URL_SQL,
        host: '127.0.0.1',
        dialect: 'mysql'
    }
};
