export {prepare}

import {Message} from "./msg";
import {Data, UserInfo, RoomData} from "./Data";
import {CardData} from "./Card";
import {shuffle, deal} from "./CardUtils";
import {BaseHandler} from "./Handler";
import {sendMessage} from "./WebUtils";


import * as seedrandom from "seedrandom";
import * as uuid from "uuid";
import * as WebSocket from "ws";



function prepare(ws : WebSocket, args : Message, dW: Data)
{
    //var obj = {type: "PREPARE", userId: uuidv4()}
    let userId = uuid.v4();
    console.log("connect userId: " + userId);
    let currentPlayer = new UserInfo(userId, ws);
    dW.waitPairQueue.push(currentPlayer);
    dW.existUserMap[currentPlayer.userId] = currentPlayer;
    let msg: Message = {type: "WAITE"};
    sendMessage(dW, currentPlayer.userId, msg);
    // ws.send(JSON.stringify(obj));

    startRoom(dW);


    // if (dW.waitPairQueue.length == 0){
        
    //     //let socket = ws;        
    //     dW.waitPairQueue.push(currentPlayer);
    //     let obj = {type: "WAITE"};
    //     ws.send(JSON.stringify(obj));
    // }
    // else
    // {
    //     let waitPlayer = dW.waitPairQueue.splice(0, 1)[0];
    //     let roomNumber = uuid.v4();
    //     let seed : number = Math.floor(Math.random() * 10000);

    //     // 初始化游戏数据
    //     waitPlayer.roomNumber = roomNumber; 
    //     currentPlayer.roomNumber = roomNumber;
    //     dW.roomDataDic[roomNumber] = new RoomData(waitPlayer, currentPlayer, seed, seedrandom(seed.toString()));

    //     dW.existUserGameRoomMap[userId] = currentPlayer;
    //     dW.existUserGameRoomMap[waitPlayer.userId] = waitPlayer;

    //     // 进入房间
    //     // socket.join(roomNumber);
    //     // waitPlayer.socket.join(roomNumber);

    //     // 游戏初始化完成，发送游戏初始化数据
    //     let obj: Message = {
    //         "type": "START",
    //         "roomNumber": roomNumber,
    //         "memberId": "one",
    //         "userId": waitPlayer.userId,
    //     };
    //     waitPlayer.ws.send(JSON.stringify(obj));
    //     obj = {
    //         "type": "START",
    //         "roomNumber": roomNumber,
    //         "memberId": "two",
    //         "userId": userId,
    //     };
    //     ws.send(JSON.stringify(obj));
    //     console.log("start room: " + roomNumber);

    //     initCard(roomNumber, dW);

    // }
}

function startRoom(dW: Data)
{
    if (dW.waitPairQueue.length >= 2)
    {
        let playerOne = dW.waitPairQueue.splice(0, 1)[0];
        let playerTwo = dW.waitPairQueue.splice(0, 1)[0];
        let roomNumber = uuid.v4();
        let seed : number = Math.floor(Math.random() * 10000);

        // 初始化游戏数据
        playerOne.roomNumber = roomNumber; 
        playerTwo.roomNumber = roomNumber;
        dW.roomDataDic[roomNumber] = new RoomData(playerOne, playerTwo, seed, seedrandom(seed.toString()));

        // dW.existUserMap[playerOne.userId] = playerOne;
        // dW.existUserMap[playerTwo.userId] = playerTwo;

        // 进入房间
        // socket.join(roomNumber);
        // waitPlayer.socket.join(roomNumber);

        // 游戏初始化完成，发送游戏初始化数据
        let msg: Message = {
            "type": "ENTERROOM",
            "roomNumber": roomNumber,
            "memberId": "one",
            "userId": playerOne.userId,
        };
        sendMessage(dW, playerOne.userId, msg);
        // waitPlayer.ws.send(JSON.stringify(obj));
        msg = {
            "type": "ENTERROOM",
            "roomNumber": roomNumber,
            "memberId": "two",
            "userId": playerTwo.userId,
        };
        sendMessage(dW, playerTwo.userId, msg);
        // ws.send(JSON.stringify(obj));
        console.log("start room: " + roomNumber);

        initCard(roomNumber, dW);

    }
    else
    {
        ;
    }
}

function initCard(roomNumber: string, dW: Data) 
{
    let currentRoom = dW.roomDataDic[roomNumber];
    let random = currentRoom.rand() * 2;

    // let first = random >= 1 ? "one" : "two"; // 判断当前是哪个玩家出牌
    // let second = random < 1 ? "one" : "two";
    currentRoom.currentPlayer = Math.floor(random);

    let copy_card: CardData[] = JSON.parse(JSON.stringify(dW.cardList));
    currentRoom.remainingCards = shuffle(currentRoom.rand, copy_card);
    // memoryData[roomNumber]["one"]["remainingCards"] = shuffle(memoryData[roomNumber].rand, Cards.map((c, index) => Object.assign({k : `one-${index}`}, c)));
    // memoryData[roomNumber]["two"]["remainingCards"] = shuffle(memoryData[roomNumber].rand, Cards.map((c, index) => Object.assign({k : `two-${index}`}, c)));


    /* one card to first player, two card to second player*/
    deal(dW, roomNumber, currentRoom.currentPlayer);
    deal(dW, roomNumber, 1 - currentRoom.currentPlayer);
    deal(dW, roomNumber, 1 - currentRoom.currentPlayer);

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

    //sendCards(roomNumber);
    
}

