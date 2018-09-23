/**
 * Created by Tharuka Jayalath on 05/29/2018
 */

const logger = require('../../logger').getLogger();
const commonUtil = require('../util/commonUtil');
const HttpResponse = require('../util/httpResponse');
const httpConstants = require('../constant/httpConstant');
const {HTTP_BAD_REQUEST,HTTP_INTERNAL_SERVER_ERROR,HTTP_CREATED,HTTP_OK} = httpConstants;
const objectConstants = require('../constant/objectConstants');
const {EMAIL, CONTACT_NUMBER, ADDRESS, NAME, ORDER_NAME,ORDER_ID,
    ORDER_STATUS, USER_EDITABLE, ACTUAL_PRICE,ESTIMATED_PRICE ,
    CREATED_DATE_TS,ORDERS_TABLE, CUSTOMERS_TABLE, ORDER_STATUS_TABLE, ORDER_STATUS_NAME,ORDER_STATUS_ID,
    ORDERS_COLLECTION, CUSTOMERS_COLLECTION} = objectConstants;
const FILE = require('path').basename(__filename);
const validator = require('validator');
// const dbUtil = require('../util/dbUtil');
const mongoUtil = require('../util/mongoUtil');
const moment = require('moment');


module.exports = {
    handleGetUsers: (request)=>{
        /*let email = commonUtil.getParameterFromURL(request, EMAIL) || commonUtil.getDataFieldFromRequest(request, EMAIL);
        if(!email){
            return Promise.reject(new HttpResponse(null,HTTP_BAD_REQUEST,null));
        }*/
        // const sql = `SELECT ${EMAIL}, ${CONTACT_NUMBER}, ${ADDRESS}, ${NAME} FROM CUSTOMERS`;
        /*return dbUtil.executeQuery(sql).then(result=>{
            if(typeof result === 'object' && result.length>0 ){
                return Promise.resolve(new HttpResponse(result, HTTP_OK, null));
            }
            return Promise.reject(new HttpResponse(null, HTTP_INTERNAL_SERVER_ERROR, null));
        }).catch(err=>{
            return Promise.reject(new HttpResponse(err, HTTP_INTERNAL_SERVER_ERROR, null));
        });*/

        return mongoUtil.findData({},CUSTOMERS_COLLECTION).then(result=>{
            if(typeof result === 'object' && result.length>0 ){
                return Promise.resolve(new HttpResponse(result, HTTP_OK, null));
            }
            return Promise.reject(new HttpResponse(null, HTTP_INTERNAL_SERVER_ERROR, null));
        }).catch(err=>{
            return Promise.reject(new HttpResponse(err, HTTP_INTERNAL_SERVER_ERROR, null));
        });

    },
    /*handleGetOrders: (request)=>{

        const fromDate = commonUtil.getParameterFromURL(request, 'from');
        const toDate = commonUtil.getParameterFromURL(request, 'to');
        const sql = `SELECT ${ORDERS_TABLE}.${ORDER_ID},${ORDER_STATUS_TABLE}.${ORDER_STATUS_NAME},${ORDERS_TABLE}.${USER_EDITABLE},${ORDERS_TABLE}.${ESTIMATED_PRICE},${ORDERS_TABLE}.${ACTUAL_PRICE},${ORDERS_TABLE}.${ORDER_NAME}, ${ORDERS_TABLE}.${CREATED_DATE_TS},
        ${CUSTOMERS_TABLE}.${NAME}, ${CUSTOMERS_TABLE}.${CONTACT_NUMBER},${CUSTOMERS_TABLE}.${ADDRESS}, ITEMS.itemId, ITEMS.itemName
        FROM ${ORDERS_TABLE}
        LEFT JOIN ${ORDER_STATUS_TABLE} ON ${ORDERS_TABLE}.${ORDER_ID}= ${ORDER_STATUS_TABLE}.${ORDER_STATUS_ID}
        LEFT JOIN ${CUSTOMERS_TABLE} ON ${ORDERS_TABLE}.${EMAIL}= ${CUSTOMERS_TABLE}.${EMAIL}
        INNER JOIN ITEMS ON ITEMS.orderId = ORDERS.orderId
        WHERE ORDERS.createdTimeStamp BETWEEN '${fromDate}' AND '${toDate}'
        GROUP BY ${ORDERS_TABLE}.${ORDER_ID} `;

        return dbUtil.executeQuery(sql).then(result=>{
            if(typeof result === 'object' && result.length>0 ){
                /!*result = result.map(order =>{
                    console.log(order);
                    const date = order.createdTimeStamp.toLocaleDateString();
                    const time = order.createdTimeStamp.toLocaleTimeString();

                    const formattedTime = moment(date+" "+time, "YYYY-MM-DD HH:MM:SS");

                    order.createdTimeStamp = formattedTime;
                    return order;
                });*!/
                return Promise.resolve(new HttpResponse(result, HTTP_OK, null));
            }
            return Promise.resolve(new HttpResponse(null, HTTP_OK, null));
        }).catch(err=>{
            return Promise.reject(new HttpResponse(err, HTTP_INTERNAL_SERVER_ERROR, null));
        });
    },*/
    handleGetOrders: (request)=>{

        return mongoUtil.findData({}, ORDERS_COLLECTION).then(result=>{
            return Promise.resolve(new HttpResponse(result, HTTP_OK, null));
        }).catch(err=>{
            return Promise.reject(new HttpResponse(err, HTTP_INTERNAL_SERVER_ERROR, null));
        });

    }
};
