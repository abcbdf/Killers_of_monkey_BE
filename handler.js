const fs = require("fs");

var prefix = 'D:/Program File/nodejs/node_global/node_modules/'
const seedrandom = require(prefix + "seedrandom");
const uuidv4 = require(prefix + 'uuid');
const {shuffle} = require("./utils");


var contents = fs.readFileSync("data.json");
const card_list  = JSON.parse(contents);

const waitPairQueue = []; // 等待排序的队列
const memoryData = {}; // 缓存的房间游戏数据，key => 房间号，value => 游戏数据
const existUserGameRoomMap = {}; // 缓存用户的房间号， key => 用户标识，value => 房间号
//const{card_dic}= fs.readFileSync("data.json");
//console.log(card_dic);
module.exports.handleSynchronousClient = function handleSynchronousClient(ws, args) {
    //console.log(socket);
    //console.log(args);
    switch (args.type) {
        case "TEST":
            test(ws, args);
            break;
        case "READY":
            prepare(ws, args);
            //deal(ws, args);
            break;
        case "CONNECT":
            connect(args, socket, socketServer);
            break;
        case "ATTACK_CARD":
            attackCard(args, socket);
            break;
    }
};

module.exports.disconnect = function disconnect(ws){
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

function test(ws, args){
    console.log("testing: " + args.msg);
    var obj = {type: "TEST", msg: "ffff"};
    ws.send(JSON.stringify(obj));
}

function prepare(ws, args){
    //var obj = {type: "PREPARE", userId: uuidv4()}
    let userId = uuidv4();
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
        let roomNumber = uuidv4();
        let seed = Math.floor(Math.random() * 10000);

        // 初始化游戏数据
        waitPlayer.roomNumber = roomNumber; 
        memoryData[roomNumber] = {
            "one": waitPlayer,
            "two": {
                userId, ws, roomNumber
            },
            seed, // 随机数种子
            rand: seedrandom(seed), // 随机方法
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
    let random = memoryData[roomNumber].rand() * 2;

    let first = random >= 1 ? "one" : "two"; // 判断当前是哪个玩家出牌
    let second = random < 1 ? "one" : "two";

    copy_card = JSON.parse(JSON.stringify(card_list));
    memoryData[roomNumber]["remainingCards"] = shuffle(memoryData[roomNumber].rand, copy_card);
    // memoryData[roomNumber]["one"]["remainingCards"] = shuffle(memoryData[roomNumber].rand, Cards.map((c, index) => Object.assign({k : `one-${index}`}, c)));
    // memoryData[roomNumber]["two"]["remainingCards"] = shuffle(memoryData[roomNumber].rand, Cards.map((c, index) => Object.assign({k : `two-${index}`}, c)));

    let RemainingCards = memoryData[roomNumber]["remainingCards"];

    Object.assign(memoryData[roomNumber][first], {
        cards: [
            getNextCard(RemainingCards),
        ]
    });

    Object.assign(memoryData[roomNumber][second], {
        cards: [
            getNextCard(RemainingCards),
        ]
    });

    sendCards(roomNumber);
    
}