const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const errorCodes = require('../constant/errorCodes.enum');
const errorMessages = require('../constant/error.messages');

const readFilePromise = promisify(fs.readFile);
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
    checkIsValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;

            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error(`${errorMessages.NOT_VALID.default} UserID = ${userId}`);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    isUserValid: (req, res, next) => {
        try {
            const {
                username, password, email, preferL
            } = req.body;

            if (!username || !password) {
                throw new Error(errorMessages.EMPTY[preferL]);
            }

            if (password.length < 8) {
                throw new Error(`${errorMessages.TOO_WEAK[preferL]}${password.length}`);
            }
            users.some((value) => {
                if (value.email === email) {
                    throw new Error(errorMessages.NOT_EXISTS[preferL]);
                }
            });

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    newDataValid: (req, res, next) => {
        try {
            const {
                username, password, preferL
            } = req.body;

            if (!username || !password) {
                throw new Error(errorMessages.EMPTY[preferL || 'default']);
            }

            if (password.length < 8) {
                throw new Error(`${errorMessages.TOO_WEAK[preferL || 'default']}${password.length}`);
            }
            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
};
