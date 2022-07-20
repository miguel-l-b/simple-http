
const http = require("http")

module.exports = class ClientResponse extends http.ServerResponse {
    /**
     * @param {http.ServerResponse} response
     */
    constructor( 
        response
    ) { 
        super(response) 
    }
}