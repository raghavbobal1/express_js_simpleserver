var express = require("express");
var app = express();
var db = require("./database.js");

var HTTP_PORT = 8090;
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});
app.get("/", (req, res, next) => {
  res.json({ message: "Okay" });
});

app.get("/api/farms", (req, res, next) => {
  console.log("inside");
  var sql = "select * from farm";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "successful",
      data: rows,
    });
  });
});

app.get("/api/report", (req, res, next) => {
  console.log("inside");
  var sql =
    "select f.name, sum(p.price * v.amount) as total_value from farm as f join vegetables as v join price as p ON f.id = v.farmField and v.crop = p.name group by f.name  ";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "successful",
      data: rows,
    });
  });
});

app.use(function (req, res) {
  res.status(404);
});



