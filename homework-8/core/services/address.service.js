const { models: { Address } } = require('../dataBase');

module.exports = {
    findAddress: (query) => Address.find(query),
    getSingleAddress: (params) => Address.findOne(params),
    createAddress: (object) => Address.create(object),
    updateAddress: (params, updateBody) => Address.updateOne(params, updateBody),
    removeAddress: (id) => Address.deleteOne({ _id: id }, (e) => console.log(e)),
};
