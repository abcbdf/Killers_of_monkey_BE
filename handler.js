module.exports = function handleSynchronousClient(socket, args) {
    //console.log(socket);
    //console.log(args);
    switch (args.type) {
        case "TEST":
            test(args);
            break;
        case "CONNECT":
            connect(args, socket, socketServer);
            break;
        case "ATTACK_CARD":
            attackCard(args, socket);
            break;
    }
};

function test(args){
    console.log("testing: " + args.msg);
}