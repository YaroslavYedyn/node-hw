const winston = require('winston');
const path = require('path');

module.exports = () => {
    const fileOption = {
        level: 'error',
        filename: path.join(process.cwd(), 'homework-12', 'core', 'write-log', 'error.txt'),
        format: winston.format.combine(
            winston.format.json({ space: 2 })
        )
    };

    const consoleOption = {
        level: 'info',
        format: winston.format.combine(
            winston.format.colorize({
                colors: {
                    info: 'green',
                    error: 'red',
                    warn: 'yellow'
                },
                all: true
            })
        )
    };

    const logger = winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.simple(),
        ),
        transports: [
            new winston.transports.Console(consoleOption),
            new winston.transports.File(fileOption)
        ]
    });
    return {
        info: (mess) => logger.info(mess),
        warn: (mess) => logger.warn(mess),
        error: (mess) => logger.error(mess),
    };
};
