export {Message};

interface Message {
    type: string,
    [propName: string]: any;
}
