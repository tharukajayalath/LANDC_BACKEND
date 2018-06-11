/**
 * Created by Tharuka Jayalath on 05/29/2018
 */
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

/*const cb = (err, results, fields)=>{
  return new Promise((resolve, reject)=>{
     if(err){
         logger.debug('inside callback function', err);
     } else{
         logger.debug('inside callback function eveything is ok');
     }

  });

};*/

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

/*
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
*/


//customerObject Properties validation is not doing here assumes relevent handler calls this function after the ve
module.exports = {

    createCustomer: async (customerObject) => {
        const sql = `INSERT INTO CUSTOMERS(email, contactNumber, name, address) VALUES('${customerObject['email']}',
        '${customerObject['contactNumber']}', '${customerObject['name']}', '${customerObject['address']}'
        ) `;

        try {
            const conn = await getConnection();
            return new Promise((resolve) => {
                conn.query(sql, (err, result) => {
                    conn.release();
                    if (err) {
                        throw err;
                    } else {
                        logger.info(result);
                        resolve(result);
                    }
                });
            });
        } catch (e) {
            logger.error(e);
            throw e;
        }

    },

//todo: implement
    updateCustomer: async (sql) => {
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
            logger.error(e);
            // throw e;
            // Promise.reject(e);
            return new Promise((reject => reject(e)));
        }


    },
    getNextOrderId: async (email) => {
        const sql = "SELECT " + objectConstants.NEXT_ORDER_ID + " FROM CUSTOMERS WHERE " + objectConstants.EMAIL + "='" + email + "'";
        try {
            const conn = await getConnection();
            return new Promise((resolve, reject) => {
                conn.query(sql, (err, result) => {
                    conn.release();
                    if (err) {
                        logger.error(err);
                        reject(err);
                    } else {
                        logger.info(FILE, "Retrieving nextOrderId for the userr", email, "success");
                        resolve(result);
                    }
                });

            });

        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    },

    createOrder: async (queryObject) => {
        try {

            const conn = await getConnection();
            return new Promise((resolve, reject) => {
                conn.beginTransaction((err) => {
                    if (err) {
                        throw err;
                    }
                    //update CUSTOMERS TABLE

                    conn.query(queryObject['updateCustomersTableSql'], (err, result) => {
                        if (err) {
                            return conn.rollback(() => {
                                throw err;
                            })
                        }

                        logger.info(result);
                        //update ORDER TABLE

                        conn.query(queryObject['updateOrderTableSql'], (err, result) => {
                            if (err) {
                                return conn.rollback(() => {
                                    throw err;
                                });
                            }
                            logger.info(result);
                            //update ITEMS TABLE
                            conn.query(queryObject['updateItemsTableSql'], (err, result) => {
                                if (err) {
                                    return conn.rollback(() => {
                                        throw err;
                                    });

                                }
                                logger.info(FILE, result);

                                conn.commit((err) => {
                                    if (err) {
                                        return conn.rollback(() => {
                                            throw err;
                                        })
                                    }

                                    logger.info(FILE, 'Order creation success');
                                    resolve(dbConstants.ORDER_CREATION_SUCCESS);
                                });
                            });

                        });

                    });

                });

            });


        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }


    },
    getOrder: async (email, orderId) => {
        try {
            let sqlToFetchOrder = `SELECT * FROM ORDERS WHERE ${EMAIL}='${email}'`;

            if (orderId) {
                sqlToFetchOrder += ` AND ${ORDER_ID}=${orderId}`;
            }
            const conn = await getConnection();
            return new Promise((resolve, reject) => {
                conn.query(sqlToFetchOrder, (err, result) => {
                    if (err) {
                        logger.error(err);
                        return reject(err);
                    } else {
                        logger.info(result);
                        return resolve(result);
                    }
                });
            });


        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }

    },
    getItems: async (email, orderId) => {
        const sql = `SELECT ${ITEM_ID}, ${ITEM_NAME}, ${QUANTITY}, ${DESCRIPTION} FROM ITEMS WHERE ${EMAIL}='${email}' AND ${ORDER_ID}=${orderId}`;
        try {
            const conn = await  getConnection();
            return new Promise((resolve, reject) => {

                conn.query(sql, (err, result) => {
                    if (err) {
                        logger.error(err);
                        return reject(err);
                    } else {
                        logger.info(result);
                        resolve(result);
                    }
                });

            });

        }
        catch(e){
                logger.error(e);
                return Promise.reject(e);
        }
    }
};
