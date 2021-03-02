const { models: { Address } } = require('../dataBase');

module.exports = {
    findAddress: (query) => Address.find(query),
    createAddress: (object) => Address.create(object),
};
