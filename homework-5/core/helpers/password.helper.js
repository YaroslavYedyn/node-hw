const bcrypt = require('bcrypt');
const { errorMessage } = require('../constants');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordEquals = await bcrypt.compare(password, hashPassword);
        if (!isPasswordEquals) {
            throw new Error(errorMessage.WRONG_DOCUMENT_ERR.default);
        }
    }
};
