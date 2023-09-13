const http = require("http");
require("dotenv").config();
const inventories = require("./data/inventories.json")

const getReq = require("./methods/get-request");
const postReq = require("./methods/post-request");
const putReq = require("./methods/put-request");
const deleteReq = require("./methods/delete-request");

const PORT = process.env.PORT

const server = http.createServer((req, res) => {
    req.inventories = inventories;
    switch (req.method) {
        case "GET":
            getReq(req, res)
            break;
        case "POST":
            postReq(req, res)
            break;
        case "PUT":
            putReq(req, res)
            break;
        case "DELETE":
            deleteReq(req, res)
            break;
    
        default:
            res.statusCode(404);
            res.setHeader("content-Type", "application/json");
            res.write(JSON.stringify({title: "Not found", message: "Route not found"}));
            res.end();  
            break;
    }
})

server.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
})