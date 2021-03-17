const { models: { User } } = require('../dataBase');

module.exports = {
    findUser: (query) => User.find(query),
    getSingleUser: (id) => User.findOne({ _id: id }),
    createUser: (object) => User.create(object),
    updateUser: (params, updateBody) => User.updateOne(params, updateBody),
    removeUser: (id) => User.deleteOne({ _id: id }),
};
