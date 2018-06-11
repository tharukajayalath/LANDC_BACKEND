/**
 * Created by Tharuka Jayalath on 05/28/2018
 */

const log4js = require('log4js');
const fs = require('file-system');
const rfs = require('rotating-file-stream');
const logFileDirectory = process.env.LOG_DIRECTORY || '/var/log/landc/';
const applicationLogFile = process.env.APP_LOG_FILE || 'application.log';
const errorLogFile = process.env.APP_ERR_LOG_FILE || 'error.log';

if (!fs.existsSync) {
    fs.mkdirSync(logFileDirectory);
}

const getLogRotationConfig = (size = '50M', interval = '1d') => {
    return {
        path: logFileDirectory,
        size: size,
        interval: interval,
        compress: 'gzip'
    }
};

const getLoggerConfig = (customConfig) => {

    // const layout = {type: 'pattern', pattern: '%d %[%p%] %c %[%x{file}%] %m%n', tokens: {file: customConfig['fileName'] || ''}};
    return {
        appenders: {
            out: {type: 'stdout'/*, layout: layout*/},
            application: {type: 'file', filename: logFileDirectory + applicationLogFile/*, layout: layout*/},
            emergencies: {type: 'file', filename: logFileDirectory + errorLogFile/*, layout: layout*/},
            error: {type: 'logLevelFilter', appender: 'emergencies', level: 'error'}
        },
        categories: {
            default: {appenders: ['out', 'application', 'error'], level: 'debug'}
        }


    };

};

const getLogger = (logRotationParams, loggerConfig) => {
    const size = logRotationParams['size'] || '50M';
    const interval = logRotationParams['interval'] || '1d';

    rfs('application.log', getLogRotationConfig(size, interval));
    rfs('error.log', getLogRotationConfig(size, interval));

    log4js.configure(getLoggerConfig(loggerConfig));

    return log4js.getLogger();

};

module.exports = {
    getLogger: getLogger
};

