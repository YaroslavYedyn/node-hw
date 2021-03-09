const { emailActions } = require('../constants');

module.exports = {
    [emailActions.ACTIVATE]: {
        templateName: 'activate',
        subject: 'Welcome to our website'
    },
    [emailActions.DELETE]: {
        templateName: 'delete',
        subject: 'your account delete'
    }
};
