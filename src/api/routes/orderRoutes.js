/**
 * Created by Tharuka Jayalath on 06/02/2018
 */

const express = require('express');
const router = express.Router();
const logger = require('../../logger').getLogger();
const commonUtil = require('../util/commonUtil');
const orderHandler = require('../handler/orderHandler');

router.post('/create', (req,res)=>{
    orderHandler.handleCreateOrder(req).then(response=>{
       commonUtil.handleResponse(res, response);
    }).catch(err=>{
        commonUtil.handleResponse(res, err);
    });
});

router.post('/update', (req, res)=>{
    orderHandler.handleUpdateOrder(req).then(response=>{
        commonUtil.handleResponse(res, response);
    }).catch(err=>{
        commonUtil.handleResponse(res, err);
    })
});

/*
router.get('/fetch', (req,res)=>{
    orderHandler.handleGetOrder(req).then(response=>{
        commonUtil.handleResponse(res, response);
    }).catch(err=>{
        commonUtil.handleResponse(res, err);
    })

});*/

router.get('/ordertime', (req, res)=>{
   orderHandler.handleOrderReadyTime(req).then(response=>{
       commonUtil.handleResponse(res, response);
   }).catch(err=>{
      commonUtil.handleResponse(res, err);
   });
});

router.get('/orderHistory', (req, res)=>{
   orderHandler.handleFetchOrderHistory(req).then(response=>{
       commonUtil.handleResponse(res, response);
   }) .catch(err=>{
       commonUtil.handleResponse(res, err);
   })
});



module.exports = router;
