const crypto = require("crypto");
const uuid = require("uuid");
const requestBodyparser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file")

module.exports =async (req, res) => {
if (req.url === "/api/inventories") {
try {
    let body = await requestBodyparser(req)
    body.uuid = uuid.v4();
    req.inventories.push(body);
    writeToFile(req.inventories)
    res.writeHead(201, {"Content-Type": "application/json"});
    res.end();  
} catch (error) {
    console.log(error);
    res.writeHead(400, { "Content-Type": "application/json" })
    res.end(
    JSON.stringify({title: "Validation Failed", message: "Request Body is not valid"}));
}
} else {
    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({title: "Not found", message: "Route not found"}));
}
};