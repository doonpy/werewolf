import "bootstrap/dist/css/bootstrap.min.css"
const $ = require("jquery");

$(document).ready(() => {
    $("#welcome button").mousedown((event) => {
        if (event.which === 1) {
            let name = $(`#welcome input[name="name"]`).val();

            //Check invalid name
            if (name === undefined) {
                alert("Name invalid!");
                return;
            }
            if (name.length === 0 || name.length < 5 || name.length > 20) {
                alert("Name must have length 5 - 20 characters!")
                return;
            }
            if (new RegExp(/^[a-zA-Z]+$/, "g").test(name) === false) {
                alert("Name only accept belong alphabets!");
                return;
            }
        }
    });
});
