const { models: { User } } = require('../dataBase');
const { queryBuilder: { baseQueryBuilder, userObjectFilter } } = require('../helpers');

module.exports = {
    findUser: async (query) => {
        const {
            keys, page, skip, sort, limit, filters
        } = baseQueryBuilder(query);

        const filterObject = userObjectFilter(filters, keys);

        const user = await User.find(query).limit(+limit).skip(skip).sort(sort);
        const count = await User.countDocuments(filterObject);

        return {
            data: user,
            page,
            limit,
            count,
            pages: Math.ceil(count / limit)
        };
    },
    getSingleUser: (query) => User.findOne(query),
    createUser: (object) => User.create(object),
    updateUser: async (query, updateBody) => {
        const {
            limit, keys, filters, sort, skip, page
        } = baseQueryBuilder(query);
        const objectFilter = userObjectFilter(filters, keys);

        const user = await User.updateOne(objectFilter, updateBody).limit(+limit).skip(skip).sort(sort);
        const count = await User.countDocuments(objectFilter);

        return {
            data: user,
            page,
            limit,
            count,
            pages: Math.ceil(limit / count)
        };
    },
    removeUser: (id) => User.deleteOne({ _id: id }),
};
