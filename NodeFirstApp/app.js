// JavaScript source code
console.log("hello from node.js")
const fs = require('fs');

const http = require('http');
//const express = require('express');


console.log("hello again from node.js")

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    console.log("request made");
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<head>Enter Meassage</head>')
        res.write('<html>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>')
        res.write('</html>')
        res.write('<h1>Hello from Node.js</h1>');
        return res.end()
    }
    if (url === 'message' && method === 'post') {
        fs.writeFileSync('message.txt', 'dummy');
        res.statusCode(302);
        res.writeHead("location", '/');
        return res.end();
    }
    //res.setHeader('Content-Type', 'text/html');
    //res.write('<head>Enter Meassage</head>')

});



/*
const app = express();

app.use((req, res, next) => {
    console.log(req);
    next();
})

app.use((req, res, next) => {
    console.log("In another middleware");
    res.send("<h1>Hello from Express.js</h1>");

})

*/

server.listen(3000);


/*
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World...\n');
});
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
server.close();
*/





