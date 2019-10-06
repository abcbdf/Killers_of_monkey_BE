var prefix = 'D:/Program File/nodejs/node_global/node_modules/'
var WebSocketServer = require(prefix + 'ws').Server,
wss = new WebSocketServer({ port: 8181 });

wss.on('connection', function (ws) {
    console.log('client connected');
    // ws.on('message', function (message) {
    //     console.log(message);
    // });
    ws.on('message', function(m){
        //console.log(m)
        obj = JSON.parse(m);
        console.log(obj);
    })
});

console.log('started...');