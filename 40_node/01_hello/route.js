/**
 * Route
 * @authors radishj (423261989@qq.com)
 * @date    2015-12-16 09:54:05
 * @version $Id$
 */
var http = require('http');

http.createServer(function(req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
    switch(path) {
        case '':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('HomePage');
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('About');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Fount');
            break;
    }
}).listen(3000);

console.log('server started on localhost:3000...');
