/**
 * Created by Tharuka Jayalath on 05/29/2018
 */
/*
const config = require('../../config');
const FILE = require('path').basename(__filename);
const logger = require('../../logger').getLogger({}, {fileName: FILE});
const mysql = require('mysql');
const objectConstants = require('../constant/objectConstants');
const {EMAIL, ORDER_ID, QUANTITY, DESCRIPTION, ITEM_NAME, ITEM_ID} = objectConstants;
const dbConstants = require('../constant/dbConstants');

const pool = mysql.createPool({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    debug: config.ENV !== 'production',
    multipleStatements: true
});

const testConnection = () => {
    return new Promise((resolve, reject) => {
        pool.connect((err) => {
            if (err) {
                logger.error(err);
                reject(err);
            }
            logger.info('Connected');
            resolve('OK Connected');
        });
    });
};

/!*const cb = (err, results, fields)=>{
  return new Promise((resolve, reject)=>{
     if(err){
         logger.debug('inside callback function', err);
     } else{
         logger.debug('inside callback function eveything is ok');
     }

  });

};*!/

const getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (!err) {
                resolve(connection);
            } else {
                logger.error(err);
                throw err;
            }
        });
    });
};

/!*
const executeQuery = async (query, callback)=>{
    try{
        const connection = await getConnection();
        logger.info(connection);
        connection.release();
        logger.info(connection);
        return 'done and dusted';
    }catch (e) {
        return e;
    }
};
*!/


//customerObject Properties validation is not doing here assumes relevent handler calls this function after the ve
module.exports = {
    executeQuery: async (sql) => {
        try {
            const conn = await getConnection();
            return new Promise((resolve, reject) => {
                conn.query(sql, (err, result) => {
                    conn.release();
                    if (err) {
                        // throw err;
                        logger.error(err);
                        reject(err);

                    } else {
                        logger.info(result);
                        resolve(result);
                    }
                });
            });

        } catch (e) {
            Promise.reject(e);
        }
    }
};
*/
