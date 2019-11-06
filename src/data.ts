export {Data};
import * as fs from 'fs';
import * as WebSocket from "ws";
import * as seedrandom from "seedrandom";

interface UserInfo
{
    userId: number;
    ws: WebSocket;

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
    roomDataDic: {[keys: number] : RoomData};
    existUserGameRoomMap: {[keys: number] : number};

    constructor() 
    { 
        this.waitPairQueue = [];
        this.roomDataDic = {};
        this.existUserGameRoomMap = {};
        // var contents : Buffer = fs.readFileSync("data.json");
        // const card_list  = JSON.parse(contents.toString());
    }  
}