const http = require("http")
const Routes = require("./routes.class")

module.exports = class Server {
    #server;
    routes = [];    
    constructor() {
        this.#server = http.createServer()
    }
    
    /**
     * 
     * @param {[]} route_first 
     * @param {string} path 
     * @returns {{path: string, type: string, data: (request: http.IncomingMessage, response: http.ServerResponse) => any}[]}
     */
    #getSubRoutes(route_first = this.routes, path = "") {
        var routes = []
        for(var i = 0; i < route_first.length; i++) {
            var route = route_first[i]
            var sub_path = "" + path;
            sub_path += route.path? route.path : ""
            if(route.type === undefined && route.data[0])
                routes.push(...this.#getSubRoutes(route.data, sub_path))
            else
            {   
                routes.push({
                    path: sub_path,
                    type: route.type,
                    data: route.data,
                })
            }
        }
        return routes;
    }

    /** 
     * @param {http.IncomingMessage} request
     * @param {http.ServerResponse} response
     */
    #handleRequest(request, response) {
        var { url, method } = request
        var routes = this.#getSubRoutes()

        if(method === undefined)
            method = "GET"

        routes.forEach(route => {
            if(route.path === url && route.type === method) {
                return route.data(request, response)
            }
        })
    }

    /** 
     * @param {string} path 
     * @param {Routes} data
     */
    use(data, path = undefined) {
        if(data.data[0])
            data = [ ...data.data ]
        this.routes.push({
            path,
            data
        })
    }

    listen(port, hostname = undefined, callback = undefined) {
        this.#server.on("request", (request, response) => {
            this.#handleRequest(request, response)
        })
        this.#server.listen(port, hostname, callback)
    }
}