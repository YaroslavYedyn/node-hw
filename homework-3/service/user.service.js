const path = require('path')
const fs = require('fs')
const utils = require('util')
const pathApp = require('../app')

const pathFile = path.join(pathApp, 'database', 'users.json')
const read = utils.promisify(fs.readFile)

const buffer = fs.readFileSync(pathFile)
const users = JSON.parse(buffer.toString())

module.exports = {
    findUsers: () => {
        return users;
    },
    findSingleUser: (userId) => {
        return users[userId]
    },
    createUser: (newUser) => {
        return fs.appendFile(pathFile, JSON.stringify(newUser))
    }


}
