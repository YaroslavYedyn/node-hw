const fs = require('fs');
const {promisify} = require('util');
const path = require('path');

const readFilePromise = promisify(fs.readFile)
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
    checkIsValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;

            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error('Not Valid ID');
            }

            next();
        } catch (e) {
            res.status(201).json(e.message);
        }
    },
    isUserValid: (req, res, next) => {
        try {
            const {username, password, email, preferL = 'en'} = req.body;

            if (!username || !password) {
                throw new Error('Some filed is empty');
            }

            if (password.length < 6) {
                throw new Error('sdasda');
            }
            users.some(value => {
                if (value.email === email) {
                    throw new Error('such a user already exists');
                }
            })

            next();
        } catch (e) {
            res.status(401).json(e.message);
        }
    }
}
