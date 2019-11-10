export {shuffle, deal};
import * as seedrandom from "seedrandom";
import {Data, UserInfo, RoomData} from "./Data";
import {Message} from "./Msg";
import {sendMessage} from "./WebUtils";

function shuffle<T>(rand: seedrandom.prng, a: T[]): T[]{
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }

    return a;
}


/*deal card to player, false mean no card in library.*/
function deal(dW: Data, roomNumber: string, player: number): boolean
{
    let currentRoom = dW.roomDataDic[roomNumber];
    if(currentRoom.remainingCards.length == 0)
    {
        return false;
    }
    else
    {
        let currentCard = currentRoom.remainingCards.splice(0, 1)[0];
        currentRoom.users[player].handCard.push(currentCard);
        let msg: Message = {type: "DRAWCARD", card: currentCard};
        sendMessage(dW, currentRoom.users[player].userId, msg);
        msg = {type: "OPPONENTDRAWCARD"};
        sendMessage(dW, currentRoom.users[1 - player].userId, msg);
        return true;
    }
    
}


