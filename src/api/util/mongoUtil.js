/**
 * Created by Tharuka Jayalath on 08/20/2018
 */

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('../../config');
const {DB_USER, DB_PASSWORD, DB_HOST,DB_NAME,DB_PORT} = config;
const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const FILE = require('path').basename(__filename);
const logger = require('../../logger').getLogger({}, {fileName: FILE});

let mongodb;

MongoClient.connect(url, {useNewUrlParser: true, poolSize: 5}, (err, db) => {
    assert.equal(null, err);
    logger.info(FILE +' Connection created.');
    mongodb = db.db(`${DB_NAME}`);
});

module.exports = {
    insertData: (data, collection) => {
        try {
            return new Promise((resolve) => {
                mongodb.collection(collection).insertOne(data, (err, res) => {
                    assert.equal(null, err);
                    resolve(res);
                });
            });
        } catch (e) {
            logger.error(FILE + " Error occurred while executing insert query");
            Promise.reject(e);
        }

    },
    findData: (query, collection) => {
        try {
            return new Promise((resolve) => {
                mongodb.collection(collection).find(query).toArray((err, res) => {
                    // assert(null, err);
                    return resolve(res);
                });
            });
        } catch (e) {
            logger.error(FILE + " Error occurred while executing find query");
            Promise.reject(e);
        }
    },
    updateData: (query, newData, collection) => {
        try {
            return new Promise(resolve => {
                mongodb.collection(collection).updateOne(query, {$set: newData}, (err, res) => {
                    assert.equal(null, err);
                    resolve(res);
                });
            });
        } catch (e) {
            logger.error(FILE + " Error occurred while executing update query");
            Promise.reject(e);
        }
    },
    /*aggregateData:(query, aggregation, collection)=>{
        try{
            return new Promise(resolve => {
                mongodb.collection(collection).aggregate([{$match: {email: query}},
                    {$group: {state:}}
                ])
            })
        }catch (e) {
            logger.error();
            Promise.reject(e);
        }
    }*/
    getDBUrl: ()=>{
        return url;
    }

};
