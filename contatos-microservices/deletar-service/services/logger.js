var fs = require('fs');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

module.exports = createLogger({
    format: combine(
        label({ label: 'Processamento!' }),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.File({
            filename: "logs/consultar-service.log",
            maxsize: 10000
        })
    ]
});