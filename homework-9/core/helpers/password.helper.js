const bcrypt = require('bcrypt');

const { errorMessage: { WRONG_EMAIL_OF_PASSWORD }, errorCode, ErrorHandler } = require('../Error');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordEquals = await bcrypt.compare(password, hashPassword);
        if (!isPasswordEquals) {
            throw new ErrorHandler(errorCode.BAD_REQUEST, WRONG_EMAIL_OF_PASSWORD.customCode, 'Wrong email of password');
        }
    }
};
