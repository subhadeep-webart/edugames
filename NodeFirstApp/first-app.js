// JavaScript source code
console.log("hello from node.js")
const fs = require('fs');
fs.writeFileSync('Hello.txt', 'hello from node.js');
console.log("hello again from node.js")
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
});
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});




