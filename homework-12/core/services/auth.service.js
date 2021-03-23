const { OAuthModel } = require('../dataBase/models');

module.exports = {
    getTokenByParams: (param) => OAuthModel.findOne({
        where: param,
    }),
    createTokens: (tokens, id, transaction) => OAuthModel.create({
        ...tokens,
        user_id: id
    }, { transaction }),
    deleteTokensByParams: (params, transaction) => OAuthModel.destroy({
        where: params,
        transaction
    }),
};
