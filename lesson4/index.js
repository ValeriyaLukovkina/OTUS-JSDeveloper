const http = require('http');
const fs = require('fs');
const { hostname } = require('os');

const port = 3001;

const server = http.createServer((req, res) => {
    fs.readFile('./index.html', { encoding: 'utf-8' }, (err, text) => {
        console.log(text);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html')
        res.end(text)
    })
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})