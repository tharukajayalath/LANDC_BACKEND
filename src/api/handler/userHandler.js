/**
 * Created by Tharuka Jayalath on 05/29/2018
 */

const logger = require('../../logger').getLogger();
const commonUtil = require('../util/commonUtil');
const HttpResponse = require('../util/httpResponse');
const httpConstants = require('../constant/httpConstant');
const {HTTP_BAD_REQUEST,HTTP_INTERNAL_SERVER_ERROR,HTTP_CREATED,HTTP_OK} = httpConstants;
const objectConstants = require('../constant/objectConstants');
const {EMAIL, CONTACT_NUMBER, ADDRESS, NAME, ID, CUSTOMERS_COLLECTION} = objectConstants;
const FILE = require('path').basename(__filename);
const validator = require('validator');
const mongoUtil = require('../util/mongoUtil');


module.exports = {

    handleCreateUser: (request) => {//todo: ADD UER VALIDATION IF USER EXISTS
        if (!request) {
            return Promise.resolve(new HttpResponse(null, httpConstants.HTTP_BAD_REQUEST, null));
        }
        const customer = commonUtil.getDataFieldFromRequest(request);
        const fields = Object.keys(customer);

        if (fields.length === 4) {
            const email = customer[objectConstants.ID];
            if (validator.isEmail(email)) {//EMAIL VALIDATION SUCCEED
                if (customer[objectConstants.CONTACT_NUMBER].length === 10) {
                    if (customer[objectConstants.NAME] && customer[objectConstants.ADDRESS]) {
                        return mongoUtil.insertData(customer,CUSTOMERS_COLLECTION ).then(result => {
                            logger.info(FILE, 'User created :', customer);
                            return Promise.resolve(new HttpResponse(result.ops[0], HTTP_CREATED, null));
                        }).catch(err => {
                            logger.error(FILE, 'Internal Server Error', err);
                            if(err['code']==='ER_DUP_ENTRY'){//user already exists
                                //currently send the previous account
                                return module.exports.handleGetUser(request);

                            }
                            return Promise.reject(new HttpResponse(null, HTTP_INTERNAL_SERVER_ERROR, null));
                        });
                    } else {
                        logger.info(FILE, 'BAD REQUEST RECEIVED NAME, ADDRESS VALIDATION FAILED');
                        return Promise.resolve(new HttpResponse(null, HTTP_BAD_REQUEST, null));
                    }
                } else {
                    logger.info(FILE, 'BAD REQUEST RECEIVED MOBILE NUMBER LENGTH VALIDATION FAILED');
                    return Promise.resolve(new HttpResponse(null, HTTP_BAD_REQUEST, null));
                }
            } else {
                logger.info(FILE, 'BAD REQUEST RECEIVED EMAIL VALIDATION FAILED');
                return Promise.resolve(new HttpResponse(null, HTTP_BAD_REQUEST, null));
            }
        } else {
            logger.info(FILE, 'BAD REQUEST RECEIVED');
            return Promise.resolve(new HttpResponse(null, HTTP_BAD_REQUEST, null));
        }
    },

    handleUpdateUser: (request) => {
        if (!request) {
            return Promise.reject(new HttpResponse(null, HTTP_BAD_REQUEST, null));
        }

        const email = commonUtil.getParameterFromURL(request, EMAIL);
        if (typeof email !== 'string' || !validator.isEmail(email)) {
            return Promise.reject(new HttpResponse(null, HTTP_BAD_REQUEST, null));
        } else {
            const newData = commonUtil.getDataFieldFromRequest(request);
            if(newData){//TODO; VALIDATE

                return mongoUtil.updateData({'_id':email },newData, CUSTOMERS_COLLECTION )
                    .then(result => {
                        logger.info(FILE, 'User updated :', result);
                        return Promise.resolve(new HttpResponse(result, HTTP_OK, null));
                    }).catch(err => {
                        logger.error(FILE, 'Internal Server Error', err);
                        return Promise.reject(new HttpResponse(null, HTTP_INTERNAL_SERVER_ERROR, null));
                    });
            }

           /*
            let sql = `UPDATE CUSTOMERS SET `;
            // const updateObject = commonUtil.getDataFieldFromRequest(request);
            const entries = Object.entries(commonUtil.getDataFieldFromRequest(request));
            const length = entries.length;
            for (let i = 0; i < length; i++) {

                if (i !== length - 1) {
                    sql += entries[i][0] + "='" + entries[i][1] + "',";
                } else {
                    sql += entries[i][0] + "='" + entries[i][1] + "'";
                }
            }

            sql += "WHERE " + objectConstants.EMAIL + "='" + email + "'";

            logger.debug('sql :', sql);

            return dbUtil.updateCustomer(sql).then(result => {
                logger.info(FILE, 'User updated :', result);
                return Promise.resolve(new HttpResponse(null, HTTP_OK, null));
            }).catch(err => {
                logger.error(FILE, 'Internal Server Error', err);
                return Promise.reject(new HttpResponse(null, HTTP_INTERNAL_SERVER_ERROR, null));
            });*/

        }


    },

    handleGetUser: (request)=>{
        let email = commonUtil.getParameterFromURL(request, EMAIL) || commonUtil.getDataFieldFromRequest(request, EMAIL);
        if(!email){
            return Promise.reject(new HttpResponse(null,HTTP_BAD_REQUEST,null));
        }
        // const sql = `SELECT ${EMAIL}, ${CONTACT_NUMBER}, ${ADDRESS}, ${NAME} FROM CUSTOMERS WHERE ${EMAIL}='${email}'`;
        return mongoUtil.findData(`{ _id: '${email}'}`, CUSTOMERS_COLLECTION).then(result=>{
            if(typeof result === 'object' && result.length>0 ){
                return Promise.resolve(new HttpResponse(result[0], HTTP_OK, null));
            }
            return Promise.reject(new HttpResponse(null, HTTP_INTERNAL_SERVER_ERROR, null));
        }).catch(err=>{
           return Promise.reject(new HttpResponse(err, HTTP_INTERNAL_SERVER_ERROR, null));
        });
    }



};
