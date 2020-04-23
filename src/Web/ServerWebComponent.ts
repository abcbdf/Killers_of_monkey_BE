export {ServerWebComponent};
import * as WebSocket from "ws";
import {ClientWebComponent} from "@root/Web/ClientWebComponent";
class ServerWebComponent
{
    private webSocketServer: WebSocket.Server;
    static readonly instance: ServerWebComponent = new ServerWebComponent();

    private clients: ClientWebComponent[];
    public run()
    {
        this.webSocketServer = new WebSocket.Server({ port: 8181 });
        this.webSocketServer.on("connection", (webSocket) => {this.connectCallback(webSocket)});
        console.log("server start");
    }
    private connectCallback(webSocket: WebSocket)
    {
        console.log('client connected');
        let client = new ClientWebComponent(webSocket);
        this.clients.push(client);
        //webSocket.on("message", (webSocketData) => {this.messageCallback(webSocket, webSocketData)});

    }
    // public messageCallback(webSocket: WebSocket, webSocketData: WebSocket.Data)
    // {
    //     try
    //     {
    //         let message : Message = JSON.parse(webSocketData.toString());
            
    //     }
    //     catch(e)
    //     {
    //         console.log(e);
    //         console.log("message: " + webSocketData.toString());
    //     }
    // }
}