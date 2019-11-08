import * as fs from 'fs';

import * as WebSocket from "ws";

// var prefix = 'D:/Program File/nodejs/node_global/node_modules/';
// // //import seedrandom from 
// // const seedrandom = require(prefix + "seedrandom");
// const uuidv4 = require(prefix + 'uuid');
import {shuffle} from "./Utils";
import {Message} from "./Msg";
import {prepare} from "./Prepare";
import {dataWhole} from "./Data";


// var contents : Buffer = fs.readFileSync("data.json");
// const card_list  = JSON.parse(contents.toString());
// import {const_card_list} from "./Card";

// const waitPairQueue = []; // 等待排序的队列
// const memoryData = {}; // 缓存的房间游戏数据，key => 房间号，value => 游戏数据
// const existUserGameRoomMap = {}; // 缓存用户的房间号， key => 用户标识，value => 房间号
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
            prepare(ws, args, dataWhole);
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

function test(ws : WebSocket, args : Message){
    console.log("testing: " + args.msg);
    let obj: Message = {type: "TEST", msg: "ffff"};
    ws.send(JSON.stringify(obj));
}

