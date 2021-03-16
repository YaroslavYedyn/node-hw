const { AddressModel } = require('../dataBase/models');
const { queryBuilder } = require('../helpers');

module.exports = {
    findAddress: async (query) => {
        const {
            keys, filters, limit, page, sort, skip
        } = queryBuilder.baseQueryBuilder(query);
        const addressObjectFilter = queryBuilder.addressObjectFilter(filters, keys);

        const address = await AddressModel.findAll({
            where: addressObjectFilter, ...limit, offset: skip, order: sort
        });
        const count = await AddressModel.count(addressObjectFilter);

        return {
            data: address,
            page,
            limit,
            count,
            pages: Math.ceil(limit / count)
        };
    },
    getSingleAddress: (params) => AddressModel.findOne({ where: params }),
    createAddress: (object) => AddressModel.save(object),
    updateAddress: async (query, updateBody) => {
        const {
            limit, keys, filters, page
        } = queryBuilder.baseQueryBuilder(query);
        const objectFilter = queryBuilder.addressObjectFilter(filters, keys);

        const address = (await AddressModel.update(updateBody, { where: objectFilter, ...limit, }));
        const count = await AddressModel.count(objectFilter);

        return {
            data: address,
            page,
            limit,
            count,
            pages: Math.ceil(count / limit),

        };
    },
    removeAddress: (id) => AddressModel.drop(id),
};
