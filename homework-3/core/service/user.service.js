const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const errorMessage = require('../constant/error.messages');

const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);

const pathFile = path.join(process.cwd(), 'database', 'users.json');
let users = [];

const readFile = async () => {
    try {
        const promise = await readFilePromise(pathFile);
        users = JSON.parse(promise.toString());
    } catch (e) {
        console.log(e);
    }
};
readFile();

module.exports = {
    findUsers: (query, preferL) => {
        const { username } = query;
        if (!username) {
            return users;
        }
        const user = users.filter((value,) => (value.username === query.username));
        if (!user) {
            throw new Error(errorMessage.NOT_FOUND[preferL || 'default']);
        }
        return user;
    },
    findUserById: (userId, preferL) => {
        const user = users[userId];
        if (!user) {
            throw new Error(errorMessage.NOT_FOUND[preferL || 'default']);
        }
        return user;
    },

    createUser: async (newUser) => {
        users.push(newUser);
        return writeFilePromise(pathFile, JSON.stringify(users));
    },

    updateUser: async (userId, newData) => {
        users.forEach((value, index) => {
            if (index === +userId) {
                users[index] = newData;
            }
        });
        await writeFilePromise(pathFile, JSON.stringify(users));
        return users;
    },

    removeUser: async (userId) => {
        const filterUsers = users.filter(((value, index) => index !== +userId));
        await writeFilePromise(pathFile, JSON.stringify(filterUsers));
    }
};
