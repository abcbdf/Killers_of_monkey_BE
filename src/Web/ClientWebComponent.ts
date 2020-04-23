export {ClientWebComponent};

import {Message} from "@root/Web/Message";

import * as WebSocket from "ws";
import * as uuid from "uuid";
import { EventEmitter } from "events";
import TypedEventEmitter from "typed-emitter";

interface ClientEventInterface
{
    newClient: (clientWebComponent: ClientWebComponent) => void
}

class ClientWebComponent
{
    private userId: string;
    private webSocket: WebSocket;
    private readonly handlers: {[keys: string]: (message: Message) => void};

    public clienEventEmitter: TypedEventEmitter<ClientEventInterface>;
    constructor(webSocket: WebSocket)
    {
        this.webSocket = webSocket;
        this.webSocket.on("message", (webSocketData) => {this.messageCallback(webSocketData)});
        this.handlers = {
            "cWaiTOpponent": (message: Message) => {this.receiveWaitOpponent(message)}
        }
        this.clienEventEmitter = new EventEmitter() as TypedEventEmitter<ClientEventInterface>;
    }
    private messageCallback(webSocketData: WebSocket.Data)
    {
        try
        {
            let message : Message = JSON.parse(webSocketData.toString());
            let handler = this.handlers[message.type];
            handler(message);
        }
        catch(e)
        {
            console.log(e);
            console.log("message: " + webSocketData.toString());
        }
    }
    private receiveWaitOpponent(message: Message)
    {
        this.userId = uuid.v4();
        console.log("connect userId: " + this.userId);
        this.clienEventEmitter.emit("newClient", this);
    }
}