const characters = require("./characters.json");
var playerChar = new Array();

module.exports.gameInit = playerList => {
    randomCharacter(playerList);
    return playerChar;
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
        p.character = characters[characters.findIndex(c => { return c.id == idChar[index] })];
        p.status = 1; //1: live, 0: die
        idChar.splice(index, 1);
    });
};