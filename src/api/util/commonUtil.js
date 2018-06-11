/**
 * Created by Tharuka Jayalath on 05/29/2018
 */

const HttpResponse = require('./httpResponse');
const httpConstants = require('../constant/httpConstant');
const logger = require('../../logger').getLogger({}, {})
const url = require('url');
module.exports = {

    handleResponse: (response, responseData) => {
        let responseStatus = null;
        if (responseData instanceof HttpResponse) {
            responseStatus = responseData.getStatusCode();
        } else {
            responseStatus = httpConstants.HTTP_INTERNAL_SERVER_ERROR;
        }
        response.status(responseStatus).send(responseData);
    },
    getDataFieldFromRequest: (request, paramName) => {
        let data = null;
        if (paramName) {
            data = request.body[paramName];
        } else {
            data = request.body;
        }
        if (paramName === 'password') {
            logger.info(`Extracted ${paramName} : *** from the request.`)
        } else {
            logger.info(`Extracted ` + (paramName || 'body') + ` ${data} from the request.`);
        }
        return data;
    },
    getParameterFromURL: (request, paramName)=>{
        let data = null;
        if(paramName){
            data = url.parse(request.url, true).query[paramName];
        }else {
            data = url.parse(request.url, true).query;
        }

        return data;
    }

};


