const { OAuthModel } = require('../dataBase/models');

module.exports = {
    getTokenByParams: (param) => OAuthModel.findOne({ where: param }),
    createTokens: (tokens, user, transaction) => OAuthModel.create({
        ...tokens,
        user_id: user.id
    }, { transaction }),
    deleteTokensByParams: (params, transaction) => OAuthModel.destroy({
        where: params,
        transaction
    }),
};
