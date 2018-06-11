/**
 * Created by Tharuka Jayalath on 05/29/2018
 */

const logger = require('../../logger').getLogger({}, {});
const commonUtil = require('../util/commonUtil');
const HttpResponse = require('../util/httpResponse');
const httpConstants = require('../constant/httpConstant');
const objectConstants = require('../constant/objectConstants');
const FILE = require('path').basename(__filename);
const validator = require('validator');
const dbUtil = require('../util/dbUtil');


module.exports = {

    handleCreateUser: (request) => {//todo: ADD UER VALIDATION IF USER EXISTS
        if (!request) {
            return Promise.resolve(new HttpResponse(null, httpConstants.HTTP_BAD_REQUEST, null));
        }
        const customer = commonUtil.getDataFieldFromRequest(request);
        const fields = Object.keys(customer);

        if (fields.length === 4) {
            const email = customer[objectConstants.EMAIL];
            if (validator.isEmail(email)) {//EMAIL VALIDATION SUCCEED
                if (customer[objectConstants.CONTACT_NUMBER].length === 10) {
                    if (customer[objectConstants.NAME] && customer[objectConstants.ADDRESS]) {
                        return dbUtil.createCustomer(customer).then(result => {
                            logger.info(FILE, 'User created :', customer);
                            return Promise.resolve(new HttpResponse(null, httpConstants.HTTP_CREATED, null));
                        }).catch(err => {
                            logger.error(FILE, 'Internal Server Error', err);
                            return Promise.reject(new HttpResponse(null, httpConstants.HTTP_INTERNAL_SERVER_ERROR, null));
                        });
                    } else {
                        logger.info(FILE, 'BAD REQUEST RECEIVED NAME, ADDRESS VALIDATION FAILED');
                        return Promise.resolve(new HttpResponse(null, httpConstants.HTTP_BAD_REQUEST, null));
                    }
                } else {
                    logger.info(FILE, 'BAD REQUEST RECEIVED MOBILE NUMBER LENGTH VALIDATION FAILED');
                    return Promise.resolve(new HttpResponse(null, httpConstants.HTTP_BAD_REQUEST, null));
                }
            } else {
                logger.info(FILE, 'BAD REQUEST RECEIVED EMAIL VALIDATION FAILED');
                return Promise.resolve(new HttpResponse(null, httpConstants.HTTP_BAD_REQUEST, null));
            }
        } else {
            logger.info(FILE, 'BAD REQUEST RECEIVED');
            return Promise.resolve(new HttpResponse(null, httpConstants.HTTP_BAD_REQUEST, null));
        }
    },

    handleUpdateUser: (request) => {
        if (!request) {
            return Promise.reject(new HttpResponse(null, httpConstants.HTTP_BAD_REQUEST, null));
        }

        const email = commonUtil.getParameterFromURL(request, objectConstants.EMAIL);
        if (typeof email !== 'string' || !validator.isEmail(email)) {
            return Promise.reject(new HttpResponse(null, httpConstants.HTTP_BAD_REQUEST, null));
        } else {
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
                return Promise.resolve(new HttpResponse(null, httpConstants.HTTP_OK, null));
            }).catch(err => {
                logger.error(FILE, 'Internal Server Error', err);
                return Promise.reject(new HttpResponse(null, httpConstants.HTTP_INTERNAL_SERVER_ERROR, null));
            });

        }


    }


};
