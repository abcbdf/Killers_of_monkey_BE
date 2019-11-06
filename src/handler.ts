import * as fs from 'fs';

import * as WebSocket from "ws";

// var prefix = 'D:/Program File/nodejs/node_global/node_modules/';
// // //import seedrandom from 
// // const seedrandom = require(prefix + "seedrandom");
// const uuidv4 = require(prefix + 'uuid');
import {shuffle} from "./utils";
import {Message} from "./msg";
import {prepare} from "./prepare";


var contents : Buffer = fs.readFileSync("data.json");
const card_list  = JSON.parse(contents.toString());

const waitPairQueue = []; // 等待排序的队列
const memoryData = {}; // 缓存的房间游戏数据，key => 房间号，value => 游戏数据
const existUserGameRoomMap = {}; // 缓存用户的房间号， key => 用户标识，value => 房间号
//const{card_dic}= fs.readFileSync("data.json");
//console.log(card_dic);

export {handleSynchronousClient, disconnect};

function handleSynchronousClient(ws : WebSocket, args : Message) {
    //console.log(socket);
    //console.log(args);
    switch (args.type) {
        case "TEST":
            test(ws, args);
            break;
        case "READY":
            prepare(ws, args, waitPairQueue, memoryData, existUserGameRoomMap);
            //deal(ws, args);
            break;
        // case "CONNECT":
        //     connect(args, socket, socketServer);
        //     break;
        // case "ATTACK_CARD":
        //     attackCard(args, socket);
        //     break;
    }
};

function disconnect(ws : WebSocket){
    // console.log(waitPairQueue);
    for (var i = 0; i < waitPairQueue.length; i ++)
    {
        if (waitPairQueue[i].socket == ws)
        {
            let waitPair = waitPairQueue.splice(i, 1);
            i--;
            console.log("disconnect userId: " + waitPair[0].userId);
        }
    }
    
};

function test(ws : WebSocket, args : Message){
    console.log("testing: " + args.msg);
    var obj = {type: "TEST", msg: "ffff"};
    ws.send(JSON.stringify(obj));
}

