const { models: { Address } } = require('../dataBase');

module.exports = {
    findAddress: (query) => Address.find(query),
    getSingleAddress: (id) => Address.findOne({ _id: id }),
    createAddress: (object) => Address.create(object),
    removeAddress: (id) => Address.deleteOne({ _id: id }, (e) => console.log(e)),
};
