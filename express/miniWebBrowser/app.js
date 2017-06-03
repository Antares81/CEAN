var http = require('http');

const hostname = "127.0.0.1";
const port = 1337;

//Server creation
var server = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type':'text/text'});
    response.end(`Hi from the server ${hostname}:${port}`);
});

//Start server listen
server.listen(port, hostname, () => {
    console.log(`The server is listening in port ${port}`);
});