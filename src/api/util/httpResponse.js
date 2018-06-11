/**
 * Created by Tharuka Jayalath on 05/28/2018
 */
 class HttpResponse{
    constructor(data, statusCode, message){
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
    }

    getData(){
        return this.data;
    }

    getStatusCode(){
        return this.statusCode;
    }

    getMessage(){
        return this.message;
    }
}

module.exports = HttpResponse;
