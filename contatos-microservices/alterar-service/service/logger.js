var winston = require('winston');
var fs = require('fs');

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
};

module.exports = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'logs/alter-service.log',
            level: 'info',
            maxsize: 1000
        })
    ]
});