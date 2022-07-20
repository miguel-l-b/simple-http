const Routes = require("./class/routes.class")
const Server = require("./class/server.class")

const server = new Server()
const routes = new Routes()

routes.get("/a", (request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" })
    response.end("Hello World!")
})

const new_routes = new Routes()
new_routes.get("/c", (request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" })
    response.end("Hello World!")
})

routes.use(new_routes, "/b")
server.use(routes)
server.listen(3000, "localhost", () => {
    console.log("Server is listening on port 3000")
})