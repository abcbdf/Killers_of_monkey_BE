import {handleSynchronousClient, disconnect} from './handler';
import {Message} from "./msg";

// let handleSynchronousClient = require('./handler').handleSynchronousClient;
// let disconnect = require('./handler').disconnect;
// var prefix = 'D:/Program File/nodejs/node_global/node_modules/'
// var WebSocketServer = require(prefix + 'ws').Server,

import * as WebSocket from "ws";

let wss = new WebSocket.Server({ port: 8181 });

wss.on('connection', function (ws) {
    console.log('client connected');
    // ws.on('message', function (message) {
    //     console.log(message);
    // });
    ws.on('message', function(m){
        
        //console.log(m)
        let obj : Message = JSON.parse(m.toString());
        handleSynchronousClient.call(this, ws, obj);
        //console.log(obj);
    });
    ws.on("close", function(m){
        disconnect.call(this, ws); // bug, not call
    })
});

console.log('started...');