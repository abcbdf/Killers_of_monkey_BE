import { ServerWebComponent } from "@root/Web/ServerWebComponent";

export {ServerManager};
class ServerManager
{
    serverWebComponent: ServerWebComponent;
    constructor()
    {
        this.serverWebComponent = ServerWebComponent.instance;
    }
    public run()
    {
        this.serverWebComponent.run();
    }
}