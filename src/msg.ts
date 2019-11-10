export {Message};
import {CardData} from "./Card";

interface Message {
    type: string,
    msg?: string,
    roomNumber?: string,
    memberId?: string,
    userId?: string,
    card?: CardData
    //[propName: string]: any;
}
