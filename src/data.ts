export {dataWhole, Data};
import * as fs from 'fs';
import * as WebSocket from "ws";
import * as seedrandom from "seedrandom";
import {const_card_list, CardData} from "./Card";

interface UserInfo
{
    userId: string;
    ws: WebSocket;
    roomNumber?: string;
}

interface RoomData
{
    one: UserInfo;
    two: UserInfo;
    seed: Number;
    rand: seedrandom.prng;

}

class Data
{
    waitPairQueue: UserInfo[];
    roomDataDic: {[keys: string] : RoomData};
    existUserGameRoomMap: {[keys: string] : string};
    cardList: ReadonlyArray<CardData>;

    constructor() 
    { 
        this.waitPairQueue = [];
        this.roomDataDic = {};
        this.existUserGameRoomMap = {};
        this.cardList = const_card_list;
        // var contents : Buffer = fs.readFileSync("data.json");
        // const card_list  = JSON.parse(contents.toString());
    }  
}

const dataWhole: Data = new Data();