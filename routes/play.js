var express = require("express");
var router = express.Router();

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

  if (!require('../socketioController').checkExist(req.body.name)) {
    res.render("index", { msg: "Name has already existed!" });
    return;
  };
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

  res.render("play", { name: req.params.name });
});

module.exports = router;
