const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { ErrorHandler, errorMessage, errorCode } = require('../Error');
const { EMAIL_ROOT_PASSWORD, EMAIL_ROOT } = require('../config/config');
const emailTemplates = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'homework-8', 'core', 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_ROOT,
        pass: EMAIL_ROOT_PASSWORD
    }
});

const sendMail = async (userMail, action, context) => {
    try {
        const templateInfo = emailTemplates[action];

        if (!templateInfo) {
            throw new ErrorHandler(errorCode.SERVER_ERROR, errorMessage.WRONG_MAIL_ACTION, 'Wrong mail action');
        }
        const html = await templateParser.render(templateInfo.templateName, context);

        console.log('log');
        return transporter.sendMail({
            from: EMAIL_ROOT,
            to: userMail,
            subject: templateInfo.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
};
