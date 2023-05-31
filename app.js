var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

let contador = 0;
let incrementar1Contador = 0;
let incrementar5Contador = 0;

app.get("/contador", (req, res) => {
  res.json({ contador });
});

app.get("/incrementar1", (req, res) => {
  contador += 1;
  incrementar1Contador += 1;
  res.json({ contador });
});

app.get("/incrementar5", (req, res) => {
  contador += 5;
  incrementar5Contador += 1;
  res.json({ contador });
});

app.get("/relatorio", (req, res) => {
  const relatorio = {contador, incrementar1Contador: incrementar1Contador, incrementar5Contador: incrementar5Contador};
  res.json(relatorio);
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;