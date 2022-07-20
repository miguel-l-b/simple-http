const http = require("http")

module.exports = class Routes {
    data = [];
    #request;
    #response;

    /**
     * @param {http.IncomingMessage} request 
     * @param {http.ServerResponse} response 
     */
    constructor(
        request, 
        response
        ) {
        this.#request = request
        this.#response = response
    }

    /**
     * @param {string} data
     */
    #cleanPath(data) {
        if(data[0] !== "/")
            data = "/" + data
        if(data[data.length - 1] === "/")
            data = data.substring(0, data.length - 1)
        return data
    }

    /**
     * @param {string} type
     * @param {string} path
     * @param {http.RequestListener} data
     */
    #addRoute(type, path, data) {
        this.data.push({
            type: type.toUpperCase(),
            path: this.#cleanPath(path),
            data,
        })
    }

    /**
     * 
     * @param {string} path 
     * @param {http.RequestListener} callback 
     */
    get(path, callback) {
        this.#addRoute("GET", path, callback)
    }
    
    /**
     * 
     * @param {string} path 
     * @param {http.RequestListener} callback 
     */
    head(path, callback) {
        this.#addRoute("HEAD", path, callback)
    }

    /**
     * 
     * @param {string} path 
     * @param {http.RequestListener} callback 
     */
    post(path, callback) {
        this.#addRoute("POST", path, callback)
    }
    
    /**
     * 
     * @param {string} path 
     * @param {http.RequestListener} callback 
     */
     put(path, callback) {
        this.#addRoute("PUT", path, callback)
    }
    
    /**
     * 
     * @param {string} path 
     * @param {http.RequestListener} callback 
     */
    delete(path, callback) {
        this.#addRoute("DELETE", path, callback)
    }

    /**
     * 
     * @param {string} path 
     * @param {http.RequestListener} callback 
     */
     connect(path, callback) {
        this.#addRoute("CONNECT", path, callback)
    }

    /**
     * 
     * @param {string} path 
     * @param {http.RequestListener} callback 
     */
     options(path, callback) {
        this.#addRoute("OPTIONS", path, callback)
    }

    /**
     * 
     * @param {string} path 
     * @param {http.RequestListener} callback 
     */
     trace(path, callback) {
        this.#addRoute("TRACE", path, callback)
    }

    /**
     * 
     * @param {string} path 
     * @param {http.RequestListener} callback 
     */
    patch(path, callback) {
        this.#addRoute("PATCH", path, callback)
    }

    /** 
     * @param {string} path 
     * @param {Routes} data 
     */
    use(data, path = undefined) {
        if(data.data[0])
            data = [ ...data.data ]
        this.data.push({
            path,
            data
        })
    }
}