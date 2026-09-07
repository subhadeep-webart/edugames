//const http = require('http');
const fs = require('fs');
const express = require('express');

const app = express();

const port = 3000;

app.get('/',(reg,res) => {
    res.send('Hello world');

})

app.listen(port,() => {
    console.log('example of listen port');
})



/*
app.use('/add-product',(req, res, next) => {
    console.log("In another middleware");
    res.send"<h1>ABS</h1>")
    //res.send("<h1>Hello from Express.js</h1>");
});

app.use('/',(req, res, next) => {
    console.log("In another middleware");
    res.send("<h1>XYZ</h1>")
    //res.send("<h1>Hello from Express.js</h1>");
    next();
});
*/





