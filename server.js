let handleSynchronousClient = require('./handler').handleSynchronousClient;
let disconnect = require('./handler').disconnect;
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
        handleSynchronousClient.call(this, ws, obj);
        //console.log(obj);
    });
    ws.on("close", function(m){
        disconnect.call(this, ws);
    })
});

console.log('started...');