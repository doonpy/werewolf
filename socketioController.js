
var player = new Array();
var playerCount = 0;

module.exports.server = (server) => {
    const io = require("socket.io")(server);

    io.on("connection", (socket) => {
        console.log("=> Someone just connected");

        playerCount++;
        io.emit("playerCount",playerCount);

        //login
        socket.on("checkIn", name => {
            player.push({ name: name, idSocket: socket.id });
        })

        //send msg
        socket.on("sendMsg", data => {
            io.emit("recMsg", { name: data.name, msg: data.msg });
        });


        socket.on("disconnect", () => {
            console.log("=> Someone just disconnected");
            player.splice(player.findIndex(p => { return p.socketId == socket.id }), 1);
            playerCount--;
            io.emit("playerCount",playerCount);
        })
    })
};

module.exports.checkExist = (name) => {
    let index = player.findIndex(p => { return p.name == name });
    if (index >= 0)
        return false;
    return true;
}