module.exports = {
    PORT: process.env.PORT || 5050,
    URL_MONGO_DATABASE: process.env.URL_MONGO_DATABASE || 'mongodb://localhost/hw-5',

    PASSWORD_SQL: process.env.PASSWORD_SQL || '5442',
    LOGIN_SQL: process.env.LOGIN_SQL || 'root',
    URL_SQL: process.env.URL_SQL_DATABASE || 'hw-9',

    EMAIL_ROOT: process.env.EMAIL_ROOT || 'test@gmail.com',
    EMAIL_ROOT_PASSWORD: process.env.EMAIL_ROOT_PASSWORD || 'Test.Password123',
};
