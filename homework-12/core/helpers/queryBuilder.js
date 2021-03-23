const { magicString: { USER_STRING, ADDRESS_STRING } } = require('../constants');

module.exports = {
    baseQueryBuilder: (query) => {
        const {
            limit = 15, page = 1, sortBy = 'createdAt', order = 'asc', ...filters
        } = query;
        const offset = (page - 1) * limit;
        const keys = Object.keys(filters);
        const orderBy = order === 'asc' ? -1 : 1;
        const sort = { [sortBy]: orderBy };
        return {
            page,
            limit,
            offset,
            keys,
            sort,
            filters
        };
    },
    userObjectFilter: (filters, keys) => {
        const filterObject = {};
        keys.forEach((key) => {
            switch (key) {
                case ADDRESS_STRING.CITY:
                    filterObject.city = { $regex: filters.city, $options: 'i' };
                    break;
                case ADDRESS_STRING.HOUSE:
                    filterObject.house = { $regex: filters.house, $options: 'i' };
                    break;
                case ADDRESS_STRING.STREET:
                    filterObject.street = { $regex: filters.street, $options: 'i' };
                    break;
                default:
                    filterObject[keys] = filters[key];
            }
        });
        return filterObject;
    },
    addressObjectFilter: (filters, keys) => {
        const filterObject = {};
        keys.forEach((key) => {
            switch (key) {
                case USER_STRING.NAME:
                    filterObject.name = { $regex: filters.name, $options: 'i' };
                    break;
                case USER_STRING.EMAIL:
                    filterObject.email = { $regex: filters.email, $options: 'i' };
                    break;
                case USER_STRING.AGE:
                    filterObject.age = { $regex: filters.age, $options: 'i' };
                    break;
                default:
                    filterObject[keys] = filters[key];
            }
        });
        return filterObject;
    }
};
