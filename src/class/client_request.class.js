const http = require("http")

module.exports = class ClientRequest extends http.IncomingMessage {
        /**
         * @param {http.IncomingMessage} request
         */
        constructor( 
            request
        ) { 
            super(request) 
        }
}
