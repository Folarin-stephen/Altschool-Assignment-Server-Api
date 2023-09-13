const writeToFile = require("../util/write-to-file");

module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1)
    console.log(baseUrl);
    let id = req.url.split("/")[3];
    // let inventory = id
    console.log(id);
    const regexV4 = new RegExp(/^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i);
    
    if (!regexV4.test(id)){
        res.writeHead(400, { "Content-Type": "application/json" })
        res.end(JSON.stringify({title: "Validation Failed", message: "Invalid UUID"}));
} else if(baseUrl === "/api/inventories/" && regexV4.test(id)){
    const index = req.inventories.findIndex((inventory) => {
        return inventory.uuid === id  
    });
    if (index === -1) {
        res.statusCode = 404;
        res.write(JSON.stringify({title: "Not found", message: "Inventory not found"}));
        res.end();
    } else {
        req.inventories.splice(index, 1);
        writeToFile(req.inventories);
        res.writeHead(204, { "Content-Type": "application/json" });
        res.end(JSON.stringify(req.inventories));
    }
}else {
    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({title: "Not found", message: "Route not found"}));
}
};