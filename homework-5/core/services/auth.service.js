const { passwordHelper } = require('../helpers');

module.exports = {
    login: (password, user) => passwordHelper.compare(password, user.password)
};
