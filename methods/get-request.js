
module.exports = (req, res) => {
let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1)
console.log(baseUrl);
let id = req.url.split("/")[3];
// let inventory = id
console.log(id);
const regexV4 = new RegExp(/^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i)

if  (req.url === "/api/inventories") {
    res.statusCode = 200;
    res.setHeader("content-Type", "application/json");
    res.write(JSON.stringify(req.inventories));
    res.end();
} else if (!regexV4.test(id)){
    res.writeHead(400, { "Content-Type": "application/json" })
    res.end(JSON.stringify({title: "Validation Failed", message: "Invalid UUID"}));
}else if (baseUrl === "/api/inventories/" && regexV4.test(id)){
    
    res.setHeader("content-Type", "application/json");
    let filteredInventory = req.inventories.filter((inventory) => {
        return inventory.uuid === id;
    });
    let exactFiltered = filteredInventory
    console.log(exactFiltered);
    if (filteredInventory.length > 0) {
        res.statusCode = 200;
        res.write(JSON.stringify(exactFiltered));
        res.end();
    } else {
        res.statusCode = 404;
        res.write(JSON.stringify({title: "Not found", message: "Inventory not found"}));
        res.end();
    }
    
}else {
    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({title: "Not found", message: "Route not found"}));
}

// if ()
};