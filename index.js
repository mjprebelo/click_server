/**
 * Import the ws module as a variable called WebSocketServer.
 */ 
var WebSocketServer = require("ws").Server;
 
/**
 * Create a new WebSocketServer running on port 7007.
 * perMessageDeflate: false - necessary to avoid memory error in Chrome
 */
var wss = new WebSocketServer({port: 7007, perMessageDeflate: false});
var clicks = 0;

console.log("Server is Running...");
 
/**
 * broadcast function, to run to all client and update de click value
 */
wss.broadcast = function broadcast(){
    //console.log("TESTE", clicks);
   
    clicks ++;

    //console.log("TESTE 2", clicks);
    wss.clients.forEach(function each(client) {
        client.send(clicks);
    });
};

/**
 * Send the star value when new connections
 */
wss.broadcast_start = function broadcast_start(){
    console.log("broadcast_start");

    wss.clients.forEach(function each(client) {
        if(clicks != 0)
        { client.send(clicks)}
        else
        { client.send('0')};
    });
};
 
/** 
 * Connection function, received the new connection from click_client 
 */
wss.on('connection', function connection(ws) {
    //console.log("ON...");
    var remoteIp = ws.upgradeReq.connection.remoteAddress;
    console.log('Connection received: ', remoteIp);
       
    ws.on('message', wss.broadcast);
       
    wss.broadcast_start();
});