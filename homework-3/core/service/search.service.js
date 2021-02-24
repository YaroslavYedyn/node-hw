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
    searchUser: (query) => {
        if (Object.keys(query).length === 2) {
            return users.filter((value,) => (value.username === query.username) && (value.email === query.email))
        }
        if (!!query.username) {
            return users.filter((value,) => (value.username === query.username))
        }
        if (!!query.email) {
            return users.filter((value,) => (value.email === query.email))
        }

    }
}
