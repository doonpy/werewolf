const characters = require("./characters.json");
const gameStatusList = {
    init: 0,
    playing: 1
};
var GAME_STATUS = gameStatusList.init;
var playerChar = new Array();

module.exports.gameInit = playerList => {
    randomCharacter(playerList);
};

//random character with each player
var randomCharacter = (playerList) => {
    let idChar = new Array();
    characters.forEach(c => {
        for (var i = 0; i < c.amount; i++) {
            idChar.push(c.id);
        }
    });
    playerChar = playerList;
    playerChar.forEach(p => {
        let index = Math.floor(Math.random() * ((idChar.length - 1) - 0) + 0);
        p.idChar = idChar[index];
        idChar.splice(index, 1);
    });
};