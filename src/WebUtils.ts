export {sendMessage};

import {Message} from "./Msg";
import {Data, UserInfo, RoomData} from "./Data";

function sendMessage(dW: Data, userId: string, msg: Message)
{
    dW.existUserMap[userId].ws.send(JSON.stringify(msg));
}
