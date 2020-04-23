export {Message};
//import {CardData} from "@root/data/Card";

interface Message {
    type: string,
    msg: string,
    roomNumber: string,
    memberId: string,
    userId: string,
    // card: CardData,
    cardId: number,
    //[propName: string]: any;
}
