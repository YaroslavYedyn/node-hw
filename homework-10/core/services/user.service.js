const { UserModel } = require('../dataBase/models');
const { queryBuilder: { baseQueryBuilder, userObjectFilter } } = require('../helpers');

module.exports = {
    findUser: async (query) => {
        const {
            keys, page, offset, sort, limit, filters
        } = baseQueryBuilder(query);

        const filterObject = userObjectFilter(filters, keys);

        const user = await UserModel.findAll({
            where: filterObject, ...limit, ...offset, order: sort
        });

        const count = await UserModel.count(filterObject);

        return {
            data: user,
            page,
            limit,
            count,
            pages: Math.ceil(count / limit)
        };
    },
    getSingleUser: (query) => UserModel.findOne({ where: query }),
    createUser: (object) => UserModel.create(object),
    updateUser: async (query, updateBody) => {
        const {
            limit, keys, filters, page
        } = baseQueryBuilder(query);
        const objectFilter = userObjectFilter(filters, keys);

        const user = await UserModel.update(updateBody, { where: objectFilter });
        const count = await UserModel.count(objectFilter);

        return {
            data: user,
            page,
            limit,
            count,
            pages: Math.ceil(limit / count)
        };
    },
    removeUser: (id) => UserModel.destroy({ where: id }),
};
