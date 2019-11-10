export {dataWhole, Data, UserInfo, RoomData};
import * as fs from 'fs';
import * as WebSocket from "ws";
import * as seedrandom from "seedrandom";
import {const_card_list, CardData} from "./Card";

class UserInfo
{
    userId: string;
    ws: WebSocket;
    roomNumber: string;
    handCard: CardData[];
    constructor(userId: string, ws: WebSocket, roomNumber: string = "no Room")
    {
        this.userId = userId;
        this.ws = ws;
        this.roomNumber = roomNumber;
        this.handCard = [];
    }
}

class RoomData
{
    users: [UserInfo, UserInfo];
    currentPlayer: number;
    // one: UserInfo;
    // two: UserInfo;
    seed: number;
    rand: seedrandom.prng;
    remainingCards: CardData[];
    constructor(one: UserInfo, two: UserInfo, seed: number, rand: seedrandom.prng)
    {
        this.users = [one, two];
        this.seed = seed;
        this.rand = rand;
        this.remainingCards = [];
    }

}

class Data
{
    waitPairQueue: UserInfo[];
    roomDataDic: {[keys: string] : RoomData};
    existUserMap: {[keys: string] : UserInfo};
    cardList: ReadonlyArray<CardData>;

    constructor() 
    { 
        this.waitPairQueue = [];
        this.roomDataDic = {};
        this.existUserMap = {};
        this.cardList = const_card_list;
        // var contents : Buffer = fs.readFileSync("data.json");
        // const card_list  = JSON.parse(contents.toString());
    }  
}

const dataWhole: Data = new Data();