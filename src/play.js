import 'bootstrap/dist/css/bootstrap.min.css'
const $ = require('jquery');

$(document).ready(() => {
    const socket = io();

    let name = $("#name").text();
    socket.emit("checkIn", name);

});