export {Message};

interface Message {
    type: string,
    msg?: string,
    roomNumber?: string,
    memberId?: string,
    userId?: string,
    //[propName: string]: any;
}
