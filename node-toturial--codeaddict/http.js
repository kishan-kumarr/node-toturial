const http = require('http');
const port = 5000;

const server = http.createServer((req, res) => {
    res.write('Hello KK');
    res.end();
});

server.listen(port);