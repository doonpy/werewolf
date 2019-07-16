import "bootstrap/dist/css/bootstrap.min.css"
const $ = require("jquery");
const moment = require("moment");

$(document).ready(() => {
    const socket = io({ reconnection: false });
    let name = $("#name").text();
    socket.emit("checkIn", name);

    //loop handle if socket server drop
    setInterval(() => {
        if (socket.connected)
            return;
        alert("Connect error!");
        window.location.replace(location.origin);
    }, 10000)

    //send messages
    var sendMsg = () => {
        let msg = $(`input[name="msg"]`).val();
        //Check invalid name
        if (msg === undefined) {
            alert("Nothing to send!");
            return;
        }
        if (msg.length === 0 || msg.length > 100) {
            alert("Messages length invalid (1 - 100)!")
            return;
        }
        if (new RegExp(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/, "g").test(msg)) {
            alert("Name only accept belong alphabets and number!");
            return;
        }

        $(`input[name="msg"]`).val("");
        socket.emit("sendMsg", { name: name, msg: msg });
    }

    $("#sendmsg").mousedown((event) => {
        if (event.which === 1) {
            sendMsg();
        }
    });

    $(`input[name="msg"]`).keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            sendMsg();
        }
    });

    //receive messages
    socket.on("recMsg", data => {
        let child = `<div class="px-2"><b>[${moment(new Date()).format("HH:MM:ss")}] ${data.name}:</b> ${data.msg}</div>`;
        $("#chatbox").prepend(child);
    });

    //update player count
    socket.on("playerCount", amount => {
        $("#playercount").text(`Now: ${amount}`);
    });
});