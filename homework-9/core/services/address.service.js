const { models: { Address } } = require('../dataBase');
const { queryBuilder } = require('../helpers');

module.exports = {
    findAddress: async (query) => {
        const {
            keys, filters, limit, page, sort, skip
        } = queryBuilder.baseQueryBuilder(query);
        const addressObjectFilter = queryBuilder.addressObjectFilter(filters, keys);
        const address = await Address.find(addressObjectFilter).limit(+limit).skip(skip).sort(sort);
        const count = await Address.countDocuments(addressObjectFilter);
        return {
            data: address,
            page,
            limit,
            count,
            pages: Math.ceil(limit / count)
        };
    },
    getSingleAddress: (params) => Address.findOne(params),
    createAddress: (object) => Address.create(object),
    updateAddress: (params, updateBody) => Address.updateOne(params, updateBody),
    removeAddress: (id) => Address.deleteOne({ _id: id }, (e) => console.log(e)),
};
