/**
 * Created by Tharuka Jayalath on 05/29/2018
 */

const express = require('express');
const router = express.Router();
const logger = require('../../logger').getLogger();
const adminHander = require('../handler/adminHandler');
const commonUtil = require('../util/commonUtil');

/*
router.post('/create', (req, res)=>{
    logger.info('/user/create route called');
    return userHandler.handleCreateUser(req).then(response=>{
        commonUtil.handleResponse(res, response);
    }).catch(err=>{
        commonUtil.handleResponse(res, err);
    });
});


router.put('/update', (req, res)=>{
    logger.info('/user/update route called');
    return userHandler.handleUpdateUser(req).then(response=>{
        commonUtil.handleResponse(res, response);
    }).catch(err=>{
        commonUtil.handleResponse(res, err);
    });
});
*/

router.get('/getUsers', (req,res)=>{
   logger.info('/admin/getUsers route called');
   return  adminHander.handleGetUsers(req).then(response=>{
       commonUtil.handleResponse(res, response);
   }).catch(err=>{
       commonUtil.handleResponse(res, err);
   })
});

router.get('/getOrders', (req,res)=>{
   logger.info('/admin/getUsers route called');
   return  adminHander.handleGetOrders(req).then(response=>{
       commonUtil.handleResponse(res, response);
   }).catch(err=>{
       commonUtil.handleResponse(res, err);
   })
});

/*
router.get('/test', (req, res)=>{

});
*/




module.exports = router;
