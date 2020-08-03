var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get("/menuItems", function (req, res, next) {
  let data = JSON.parse(fs.readFileSync("data/menu_items.json"));
  res.send(data);
});

router.get("/events", function (req, res, next) {
  let data = JSON.parse(fs.readFileSync("data/events.json"));
  res.send(data);
});

router.post("/saveMenu", function (req, res, next) {
  console.log(req.body.arr);
  fs.writeFileSync(
    "data/menu_items.json",
    JSON.stringify(req.body.arr, null, 4)
  );
  var spawn = require("child_process").spawn;
  var process = spawn("python", ["./script.py"]);
  process.stdout.on("data", function (data) {
    res.send({ data: data.toString() });
  });
});

router.post("/saveEvents", function (req, res, next) {
  console.log(req.body.arr);
  fs.writeFileSync("data/events.json", JSON.stringify(req.body.arr, null, 4));
  var spawn = require("child_process").spawn;
  var process = spawn("python", ["./script.py"]);
  process.stdout.on("data", function (data) {
    res.send({ data: data.toString() });
  });
});

module.exports = router;
