/**
 * Created by Tharuka Jayalath on 05/28/2018
 */
const config = require('../../config');
const FILE = require('path').basename(__filename);
const logger = require('../../logger').getLogger({},{fileName: FILE});
const redis = require('redis');
const client = redis.createClient(config.REDIS_PORT, config.REDIS_HOST);
client.on('error',(err)=>{
    logger.error(err);
});

const set = (key, value, option) =>{

    return new Promise((resolve, reject)=>{
        if(option){
            // client.expiration()
            logger.info('option found');
            return resolve('done');
        }else {
            client.hmset(key, value,(err, res)=>{
                if(err){
                    logger.error(err);
                    return reject(err);
                }else{
                    logger.info(res);
                    return resolve(res)
                }
            })
        }
    });

};

const get = (key)=>{
    return new Promise((resolve, reject)=>{
        client.hgetall(key,(err, obj)=>{
           if(err){
               logger.error(err);
               reject(err);
           } else{
               logger.info(obj);
               resolve(obj);
           }
        });

    });
};

module.exports = {
    set: set,
    get: get
};
