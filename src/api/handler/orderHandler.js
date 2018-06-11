/**
 * Created by Tharuka Jayalath on 05/31/2018
 */

const logger = require('../../logger').getLogger({},{});
const commonUtil = require('../util/commonUtil');
const HttpResponse = require('../util/httpResponse');
const httpConstants = require('../constant/httpConstant');
const objectConstants = require('../constant/objectConstants');
const {EMAIL, ORDER_ID,REQUIRED_DATE,ORDER_NAME, NEXT_ORDER_ID, ITEM_ID, ITEM_NAME,DESCRIPTION,QUANTITY, ITEMS} = objectConstants;
const FILE = require('path').basename(__filename);
const validator = require('validator');
const dbUtil = require('../util/dbUtil');


module.exports = {

    handleCreateOrder: (request) =>{
        const email = commonUtil.getParameterFromURL(request, objectConstants.EMAIL);

        if( typeof email !== 'string' || !validator.isEmail(email)){
            return Promise.reject(new HttpResponse(null, httpConstants.HTTP_BAD_REQUEST, null));
        }else {
            //TODO: May need to check whether user exists
            return dbUtil.getNextOrderId(email).then(result=>{
               logger.info(result);

               const orderObject = commonUtil.getDataFieldFromRequest(request, null);
               const {items, orderName, requiredDate} = orderObject;
               logger.info(orderObject);
               const orderId = result[0][NEXT_ORDER_ID];
               const nextOrderId = orderId + 1;
               //create query to update order table
                const queryObject = {};

                //Query to add entry to ORDES table
                queryObject['updateOrderTableSql'] = `INSERT INTO ORDERS(${EMAIL}, ${ORDER_ID}, ${ORDER_NAME}, ${REQUIRED_DATE}) VALUES ('${email}',${orderId}, '${orderName}', '${requiredDate}' )`;
                //Query to update CUSTOMERS table with next orderId
                queryObject['updateCustomersTableSql'] = `UPDATE CUSTOMERS SET ${NEXT_ORDER_ID}=${nextOrderId} WHERE ${EMAIL}='${email}'`;
                //Query to add items to ITEMS table
                let index = 0;
                queryObject['updateItemsTableSql'] = items.map(item=> {
                    index++;
                    return `INSERT  INTO ITEMS VALUES('${email}', ${orderId}, ${index}, '${item[NAME]}', '${item[QUANTITY]}', '${item[DESCRIPTION]}');`;

                } ).reduce((sql, itemSql)=>sql+itemSql,'');

                return dbUtil.createOrder(queryObject).then(result=>{
                    logger.info(FILE, result);
                    return Promise.resolve(new HttpResponse({ORDER_ID: orderId}, httpConstants.HTTP_OK, null));
                }).catch(err=>{
                    logger.error(err);
                   return Promise.reject(new HttpResponse(null, httpConstants.HTTP_INTERNAL_SERVER_ERROR,null));
                });

            }).catch(err=>{
                logger.error(err);
                return Promise.reject(new HttpResponse(null, httpConstants.HTTP_BAD_REQUEST,null));
            });

        }
    },
    handleGetOrder: (request)=>{//TODO: items fetching query need to be sorted by using itemId
        const email  = commonUtil.getParameterFromURL(request, objectConstants.EMAIL);
        const orderId = commonUtil.getParameterFromURL(request, objectConstants.ORDER_ID);


        if(!orderId && email){//orderId not specified need to send order details without items
            return dbUtil.getOrder(email).then(result=>{
                logger.info(result);

                return Promise.resolve(new HttpResponse(result, httpConstants.HTTP_OK, null));

            }).catch(err=>{

                return Promise.reject(new HttpResponse(err, httpConstants.HTTP_INTERNAL_SERVER_ERROR, null));
            })

        }else if(orderId && email){
            return dbUtil.getOrder(email, orderId).then(result=>{
                const orderObject = result[0];
                logger.info(orderObject);
                return dbUtil.getItems(email, orderId).then(result=>{
                   logger.info(result);
                   orderObject[ITEMS] = result;
                   return Promise.resolve(new HttpResponse(orderObject, httpConstants.HTTP_OK, null));
                }).catch(err=>{
                    return Promise.reject(new HttpResponse(err, httpConstants.HTTP_INTERNAL_SERVER_ERROR, null));
                });
            }).catch(err=>{
                logger.error(err);
                return Promise.reject(err);
            })

        }



    },

    handleUpdateOrder: (request)=>{//this route may be used by both mobile app and admin portal
        const email = commonUtil.getParameterFromURL(request, EMAIL);
        const orderId = commonUtil.getParameterFromURL(request, ORDER_ID);

        if(!email || !orderId){
            return Promise.reject(new HttpResponse(null,httpConstants.HTTP_BAD_REQUEST, null));
        }else{
            const updateObject = commonUtil.getDataFieldFromRequest(request);
            const queris = {};
            //need to create qery to update orders table
            let index = 0;
            // let tempQury = `UPDATE ORDERS SET `;
            //TODO: test
            if(updateObject['orderChanges'] && updateObject['orderChanges'].length>0){

                queries['orderTableSql']=updateObject['orderChanges'].map(entry=>{

                    if(entry[ORDER_NAME]){//may be can simplify this (go through the array indexing of updated order properties)
                        if(index===0){
                            index++;
                            return `${ORDER_NAME} = '${entry[ORDER_NAME]}'`;
                        }else{
                            return `,${ORDER_NAME} = '${entry[ORDER_NAME]}'`;
                        }
                    }else if(entry[REQUIRED_DATE]){
                        if(index===0){
                            index++;
                            return `${REQUIRED_DATE}='${entry[REQUIRED_DATE]}'`;
                        }else{
                            return `,${REQUIRED_DATE}='${entry[REQUIRED_DATE]}'`;
                        }
                    }else{
                        //no need to handle this
                    }

                }).reduce((finalQuery, query)=>{
                    return finalQuery +=query
                },'UPDATE ORDERS SET ');
            }

            //need to create a query to update items table
            if(updateObject['deleted']&& updateObject['deleted'].length> 0) {
                queries['deletedItemsQuery'] = updateObject['deleted'].map((entry)=>{
                    return `DELETE FROM ITEMS WHERE ${ITEM_ID}=${entry[ITEM_ID]};`;
                }).reduce((finalQuery, query)=>{return finalQuery+=query},'');
            }

            if(updateObject['updated'] &&updateObject['updated'].length>0) {


            }

            if(updateObject['newEntries']&& updateObject['newEntries'].length>0){


            }

            //insert

            //deletions

        }

        const entries = Object.entries(data);

        entries.forEach();
        //this logic shoudl add to all the entries in the array
        const queries = {};
        if(entry[0] ===ITEMS){
            //crete the query to update items
        }else{

        }


    },

    handleDeleteOrder: (request)=>{

    },




};

}
