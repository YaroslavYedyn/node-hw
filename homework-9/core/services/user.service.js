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
    updateUser: (params, updateBody) => User.updateOne(params, updateBody),
    removeUser: (id) => User.deleteOne({ _id: id }),
};
