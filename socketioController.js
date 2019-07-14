
var player = new Array();

module.exports.server = (server) => {
    const io = require("socket.io")(server);

    io.on("connection", (socket) => {
        console.log("=> Someone just connected");

        socket.on("checkIn", name => {
            player.push({ name: name, idSocket: socket.id });
            console.log(player);
        })
        socket.on("disconnect", () => {
            console.log("=> Someone just disconnected");
            player.splice(player.findIndex(p => { return p.socketId == socket.id }), 1);
            console.log(player);
        })
    })
};

module.exports.checkExist = (name) => {
    let index = player.findIndex(p => { return p.name == name });
    if (index >= 0)
        return false;
    return true;
}