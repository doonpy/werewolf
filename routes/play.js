var express = require("express");
var router = express.Router();
var socketioController = require('../socketioController');

/* GET users listing. */
router.post("/", (req, res, next) => {
  //check referer invalid
  let msg = "Bad request!";
  if (req.headers.referer === undefined) {
    res.status(500).render("index", { msg: msg });
    return;
  }
  if (!req.headers.referer.includes(req.headers.host)) {
    res.status(500).render("index", { msg: msg });
    return;
  }

  if (!socketioController.checkExist(req.body.name)) {
    res.render("index", { msg: "Name has already existed!" });
    return;
  };

  if (socketioController.isFull()) {
    res.render("index", { msg: "Enough players!" });
    return;
  }
  console.log(socketioController.gameStatus);
  if (require('../socketioController').gameStatus == 1) {
    res.render("index", { msg: "Game is playing!" });
    return;
  }

  res.redirect(`/play/${req.body.name}`);
});

router.get("/:name", (req, res, next) => {
  if (req.headers.referer === undefined) {
    res.status(500).render("index", { msg: msg });
    return;
  }
  if (!req.headers.referer.includes(req.headers.host)) {
    res.status(500).render("index", { msg: msg });
    return;
  }

  res.render("play", {
    name: req.params.name,
    maxPlayer: socketioController.maxPlayer
  });
});

module.exports = router;
