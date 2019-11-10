import * as fs from 'fs';

import * as WebSocket from "ws";

// var prefix = 'D:/Program File/nodejs/node_global/node_modules/';
// // //import seedrandom from 
// // const seedrandom = require(prefix + "seedrandom");
// const uuidv4 = require(prefix + 'uuid');
import {shuffle} from "./CardUtils";
import {Message} from "./Msg";
import {prepare} from "./Prepare";
import {dataWhole, Data} from "./Data";


// var contents : Buffer = fs.readFileSync("data.json");
// const card_list  = JSON.parse(contents.toString());
// import {const_card_list} from "./Card";

// const waitPairQueue = []; // 等待排序的队列
// const memoryData = {}; // 缓存的房间游戏数据，key => 房间号，value => 游戏数据
// const existUserGameRoomMap = {}; // 缓存用户的房间号， key => 用户标识，value => 房间号
//const{card_dic}= fs.readFileSync("data.json");
//console.log(card_dic);

export {handleSynchronousClient, disconnect, BaseHandler};

interface BaseHandler{
    (ws : WebSocket, args : Message, dW: Data): void;
}

let test: BaseHandler = function(ws : WebSocket, args : Message, dW: Data){
    console.log("testing: " + args.msg);
    let obj: Message = {type: "TEST", msg: "ffff"};
    ws.send(JSON.stringify(obj));
}

/*don't use 'this'*/
const handlers: {[keys: string]: BaseHandler} = {
    "TEST": test,
    "READY": prepare,
};

function handleSynchronousClient(ws : WebSocket, args : Message) {
    //console.log(socket);
    //console.log(args);
    let handler: BaseHandler = handlers[args.type];
    handler(ws, args, dataWhole);
};

function disconnect(ws : WebSocket){
    // console.log(waitPairQueue);
    for (var i = 0; i < dataWhole.waitPairQueue.length; i ++)
    {
        if (dataWhole.waitPairQueue[i].ws == ws)
        {
            let waitPair = dataWhole.waitPairQueue.splice(i, 1);
            i--;
            console.log("disconnect userId: " + waitPair[0].userId);
        }
    }
    
};



