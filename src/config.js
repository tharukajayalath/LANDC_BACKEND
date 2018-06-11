/**
 * Created by Tharuka Jayalath on 05/28/2018
 */

module.exports = {
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 12000,
    REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    DB_HOST: process.env.DB_HOST || '127.0.0.1',
    DB_PORT: process.env.DB_PORT || 3306,
    DB_NAME: process.env.DB_NAME || 'LANDC',
    DB_USER: process.env.DB_USER || 'landcdbuser',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    ENV: process.env.ENV || 'development'
};
