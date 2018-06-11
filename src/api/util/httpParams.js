/**
 * Created by Tharuka Jayalath on 05/28/2018
 */

export default class HttpParams {
    constructor(url, headers, data){
        this.url = url;
        this.headers = headers;
        this.data = data;
    }


    getUrl(){
        return this.url;
    }

    setUrl(url){
        this.url = url;
    }

    getHeaders(){
        return this.headers;
    }

    setHeaders(headers){
        this.headers = headers;
    }

    getData(){
        return this.data;
    }

    setData(data){
        this.data = data;
    }

}
