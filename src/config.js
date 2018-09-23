/**
 * Created by Tharuka Jayalath on 05/28/2018
 */
const parseStringToNumber = (stringValue) => {
    if (!isNaN(stringValue)) {
        return parseInt(stringValue);
    } else {
        throw Error("Parameter is not a number!");
    }
};

module.exports = {
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 12000,
    REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 27017,
    DB_NAME: process.env.DB_NAME || 'landc',
    DB_USER: process.env.DB_USER || 'lcdbackend',
    DB_PASSWORD: process.env.DB_PASSWORD || 'mfs!rg52t',
    ENV: process.env.ENV || 'development',
    MAX_AGE: parseStringToNumber(process.env.MAX_AGE || 86400),
    SECRET: 'JDLSFHAFKLDJHJAHSFLDHHDSJFLAH'
};
// TODO: revert these to local config before commit add prod conf as environment variables added only for testing
