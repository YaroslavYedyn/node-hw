const path = require('path');

const { emailActions, constants: { PHOTOS_FOLDER_NAME } } = require('../constants');
const { successMessage } = require('../Error');
const { passwordHelper } = require('../helpers');
const {
    userService,
    authService,
    emailService,
    fileService
} = require('../services');
const { sequelize } = require('../dataBase');

module.exports = {
    findUser: async (req, res, next) => {
        try {
            const users = await userService.findUser(req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    getSingleUser: async (req, res, next) => {
        try {
            const user = await userService.getSingleUser({ id: req.params.id });

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        const transaction = await sequelize.transaction();
        try {
            const { user: { password, email }, avatar } = req;
            const hashPassword = await passwordHelper.hash(password);
            let uploadPath = '';

            const newUser = await userService.createUser({
                ...req.user,
                password: hashPassword
            }, transaction);

            if (avatar) {
                uploadPath = await fileService.downloadFile(avatar, PHOTOS_FOLDER_NAME, newUser, 'user');
                await userService.updateUser({ id: newUser.id }, { avatar: uploadPath }, transaction);
            }

            const baseURl = 'http://localhost:5050/';
            const url = path.normalize(baseURl + uploadPath);

            await emailService.sendMail(email, emailActions.ACTIVATE, {
                name: req.body.name,
                avatar: url,
                token: newUser.activate_token
            });

            await transaction.commit();
            res.status(200)
                .json('Please check email');
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        const transaction = await sequelize.transaction();
        try {
            const { query, body, avatar } = req;

            if (avatar) {
                const user = userService.getSingleUser(query);
                const uploadPath = await fileService.downloadFile(avatar, PHOTOS_FOLDER_NAME, user, 'user', transaction);

                await userService.updateUser(query, {
                    ...body,
                    avatar: uploadPath
                }, { transaction });
            }
            await userService.updateUser(query, body, transaction);

            await transaction.commit();
            res.json(successMessage.UPDATE);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
    forgotPassword: async (req, res, next) => {
        const transaction = await sequelize.transaction();
        try {
            const { new_password, email } = req.body;
            const newHashPassword = await passwordHelper.hash(new_password);

            await userService.updateUser({ email }, { password: newHashPassword }, transaction);

            await transaction.commit();
            res.json(successMessage.UPDATE);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
    removeUser: async (req, res, next) => {
        const transaction = await sequelize.transaction();
        try {
            const { email, name } = req.user;

            await userService.removeUser(req.params.id, transaction);
            await authService.deleteTokensByParams({ user_id: req.params.id }, transaction);

            await emailService.sendMail(email, emailActions.DELETE, { name });

            await transaction.commit();
            res.json(successMessage.REMOVE);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
};
