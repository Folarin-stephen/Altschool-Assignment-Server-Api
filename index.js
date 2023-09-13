
const http = require('http');
const fs = require('fs');
// const fun =() =>require('dotenv').config();



const port = 3001

const server = http.createServer((req, res) =>{
    console.log({ path: req.url, method:req.method });
    
    if (req.url === '/') {
        const file = fs.readFileSync('./index.html');
        res.setHeader("content-type", "text/html");
        res.writeHead(200)
        res.write(file);
        res.end();
    }

    if (req.url.endsWith('.html') && req.method === "GET"){
        try {
            const splitUrl = req.url.split('/');
            const file= fs.readFileSync(splitUrl[1])
            const fileLocation = `./${file}`
            res.setHeader("content-type", "text/html");

            res.writeHead(200)
            res.write(file);
            res.end();
        } catch (error) {
        const errors = fs.readFileSync('./404.html');
        res.setHeader("content-type", "text/html");
        res.writeHead(404)
        res.write(errors);
        res.end();
        }

       
    }
})


server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});