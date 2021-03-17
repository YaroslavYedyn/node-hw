const { models: { User } } = require('../dataBase');

module.exports = {
    findUser: (query) => User.find(query),
    getSingleUser: (query) => User.findOne(query),
    createUser: (object) => User.create(object),
    updateUser: (params, updateBody) => User.updateOne(params, updateBody),
    removeUser: (id) => User.deleteOne({ _id: id }),
};
