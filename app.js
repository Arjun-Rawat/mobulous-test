const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./routes/v1");
const path = require("path");

const app = express();
// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));


// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

// v1 api routes
app.use("/v1", routes);

app.get("/", function (req, res) {
  res.render("index", {
    title: "View Engine Demo",
  });
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.send({ status: httpStatus.NOT_FOUND, message: "Not found" });
});

module.exports = app;
