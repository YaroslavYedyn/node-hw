const fs = require('fs');
const {promisify} = require('util');
const path = require('path');

const errorCodes = require('../constant/errorCodes.enum')
const errorMessages = require('../constant/error.messages')

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
                throw new Error(`${errorMessages.NOT_VALID} UserID = ${userId}`);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    isUserValid: (req, res, next) => {
        try {
            const {username, password, email} = req.body;

            if (!username || !password) {
                throw new Error(errorMessages.EMPTY);
            }

            if (password.length < 6) {
                throw new Error(`${errorMessages.TOO_WEAK}${password.length}`);
            }
            users.some(value => {
                if (value.email === email) {
                    throw new Error(errorMessages.NOT_EXISTS);
                }
            })

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
}
