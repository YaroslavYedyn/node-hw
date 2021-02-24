const fs = require('fs');
const {promisify} = require('util');
const path = require('path');


const readFilePromise = promisify(fs.readFile)
const writeFilePromise = promisify(fs.writeFile)

const pathFile = path.join(process.cwd(), 'database', 'users.json')
let users = []

const readFile = async () => {
    try {
        const promise = await readFilePromise(pathFile)
        users = JSON.parse(promise.toString())
    } catch (e) {
        console.log(e)
    }
}
readFile();

module.exports = {
    findUsers: () => {
        return users;
    },
    findUserById: (userId) => {
        return users[userId]

    },
    createUser: async (newUser) => {
        users.push(newUser)
        return await writeFilePromise(pathFile, JSON.stringify(users))
    },
    updateUser: (userId, newData) => {
        users.forEach((value, index) => {
            if (index === +userId) {
                users[index] = newData
            }
        })
        writeFilePromise(pathFile, JSON.stringify(users));
        return users;
    },
    removeUser: (userId) => {
        const filterUsers = users.filter(((value, index) => index !== +userId))
        writeFilePromise(pathFile, JSON.stringify(filterUsers))
    }
}
