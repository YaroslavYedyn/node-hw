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
    updateAddress: async (query, updateBody) => {
        const {
            limit, sort, skip, keys, filters, page
        } = queryBuilder.baseQueryBuilder(query);
        const objectFilter = queryBuilder.addressObjectFilter(filters, keys);

        const address = await Address.updateOne(objectFilter, updateBody).limit(+limit).skip(skip).sort(sort);
        const count = await Address.countDocuments(objectFilter);

        return {
            data: address,
            page,
            limit,
            count,
            pages: Math.ceil(count / limit),

        };
    },
    removeAddress: (id) => Address.deleteOne({ _id: id }, (e) => console.log(e)),
};
