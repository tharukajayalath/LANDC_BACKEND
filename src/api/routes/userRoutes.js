/**
 * Created by Tharuka Jayalath on 05/29/2018
 */

const express = require('express');
const router = express.Router();
const logger = require('../../logger').getLogger({},{});
const userHandler = require('../handler/userHandler');
const commonUtil = require('../util/commonUtil');

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
})


module.exports = router;
