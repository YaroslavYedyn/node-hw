const { models: { User } } = require('../dataBase');

module.exports = {
    findUsers: async (query) => {
        const user = await User.find(query);
        return user;
    },

    createUser: async (object) => {
        await User.create(object);
    },

    findUserByID: async (userId) => {
        const user = await User.findById(userId);
        return user;
    },

    updateUser: async (query, updateBody) => {
        const user = await User.updateOne(query, updateBody);
        return user;
    },

    removeUser: async (userId) => {
        await User.deleteOne({ _id: userId }, (err) => console.log(err));
    }
};
