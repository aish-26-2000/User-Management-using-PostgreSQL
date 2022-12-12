// importing winston
const winston = require('winston');
const { format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;
require('winston-daily-rotate-file');

// daily rotate file function
const fileRotateTransport = new transports.DailyRotateFile({
    filename: 'logs/rotate-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
});

// creating logger
const logger = winston.createLogger({
    level: 'debug',
    // formatting
    format: combine(
        timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss',
        }),
        prettyPrint()
    ),
    transports: [
        new winston.transports.Console(),
        // log rotation
        fileRotateTransport,
    ],
});

// export
module.exports = logger;
