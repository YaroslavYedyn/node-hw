const { Op } = require('sequelize');
const { authService } = require('../services');

module.exports = async () => {
    await authService.deleteTokensByParams({
        updatedAt: {
            [Op.lte]: new Date(new Date() - 24 * 60 * 60 * 1000)
        }
    });
};
