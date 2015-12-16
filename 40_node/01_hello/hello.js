/**
 * Hello world
 * @authors radishj (423261989@qq.com)
 * @date    2015-12-16 09:46:45
 * @version $Id$
 */
var http = require('http');

http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.end('hello world!');
}).listen(3000);

console.log('server started on localhost:3000...');