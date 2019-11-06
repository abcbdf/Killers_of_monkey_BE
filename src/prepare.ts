export {prepare}

import {Message} from "./msg";


import * as seedrandom from "seedrandom";
import * as uuid from "uuid";
import * as WebSocket from "ws";



function prepare(ws : WebSocket, args : Message, waitPairQueue, memoryData, existUserGameRoomMap){
    //var obj = {type: "PREPARE", userId: uuidv4()}
    let userId = uuid.v4();
    console.log("connect userId: " + userId);
    if (waitPairQueue.length == 0){
        
        //let socket = ws;        
        waitPairQueue.push({userId, ws});
        let obj = {type: "WAITE"};
        ws.send(JSON.stringify(obj));
    }
    else
    {
        let waitPlayer = waitPairQueue.splice(0, 1)[0];
        let roomNumber = uuid.v4();
        let seed : number = Math.floor(Math.random() * 10000);

        // 初始化游戏数据
        waitPlayer.roomNumber = roomNumber; 
        memoryData[roomNumber] = {
            "one": waitPlayer,
            "two": {
                userId, ws, roomNumber
            },
            seed, // 随机数种子
            rand: seedrandom(seed.toString()), // 随机方法
        };

        existUserGameRoomMap[userId] = roomNumber;
        existUserGameRoomMap[waitPlayer.userId] = roomNumber;

        // 进入房间
        // socket.join(roomNumber);
        // waitPlayer.socket.join(roomNumber);

        // 游戏初始化完成，发送游戏初始化数据
        waitPlayer.ws.send(JSON.stringify({
            "type": "START",
            roomNumber,
            "memberId": "one",
            "userId": waitPlayer.userId,
        }));
        ws.send(JSON.stringify({
            "type": "START",
            roomNumber,
            "memberId": "two",
            "userId": userId,
        }));
        console.log("start room: " + roomNumber);

        initCard(roomNumber);

    }
}

function initCard(roomNumber) {
    // let random = memoryData[roomNumber].rand() * 2;

    // let first = random >= 1 ? "one" : "two"; // 判断当前是哪个玩家出牌
    // let second = random < 1 ? "one" : "two";

    // copy_card = JSON.parse(JSON.stringify(card_list));
    // memoryData[roomNumber]["remainingCards"] = shuffle(memoryData[roomNumber].rand, copy_card);
    // // memoryData[roomNumber]["one"]["remainingCards"] = shuffle(memoryData[roomNumber].rand, Cards.map((c, index) => Object.assign({k : `one-${index}`}, c)));
    // // memoryData[roomNumber]["two"]["remainingCards"] = shuffle(memoryData[roomNumber].rand, Cards.map((c, index) => Object.assign({k : `two-${index}`}, c)));

    // let RemainingCards = memoryData[roomNumber]["remainingCards"];

    // Object.assign(memoryData[roomNumber][first], {
    //     cards: [
    //         getNextCard(RemainingCards),
    //     ]
    // });

    // Object.assign(memoryData[roomNumber][second], {
    //     cards: [
    //         getNextCard(RemainingCards),
    //     ]
    // });

    // sendCards(roomNumber);
    
}

