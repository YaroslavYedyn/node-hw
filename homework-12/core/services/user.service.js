const { UserModel } = require('../dataBase/models');
const { queryBuilder: { baseQueryBuilder, userObjectFilter } } = require('../helpers');

module.exports = {
    findUser: async (query) => {
        const {
            keys, page, offset, limit, filters
        } = baseQueryBuilder(query);

        const filterObject = userObjectFilter(filters, keys);

        const user = await UserModel.findAll({
            where: filterObject, ...limit, ...offset,
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
    createUser: async (object, transaction) => {
        const user = await UserModel.create(object, { transaction });
        return user;
    },
    updateUser: async (query, updateBody, transaction) => {
        const {
            limit, keys, filters, page
        } = baseQueryBuilder(query);
        const objectFilter = userObjectFilter(filters, keys);

        const user = await UserModel.update(updateBody, {
            where: objectFilter,
            transaction
        });
        const count = await UserModel.count(objectFilter);

        return {
            data: user,
            page,
            limit,
            count,
            pages: Math.ceil(limit / count)
        };
    },
    removeUser: (id, transaction) => UserModel.destroy({
        where: { id },
        transaction
    }),
};
