const { emailActions } = require('../constants');

module.exports = {
    [emailActions.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome to our website'
    },
    [emailActions.DELETE]: {
        templateName: 'delete',
        subject: 'your account delete'
    }
};
