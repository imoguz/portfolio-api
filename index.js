"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("express-async-errors");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const packagejson = require("./package.json");

// ----- Convert to JSON -----
app.use(bodyParser.json());

// ----- cors for all requiest -----
app.use(require("cors")());

// ----- routes -----
app.use("/portfolio/api/v1", require("./src/routes/index"));

// ----- main path -----
app.all("/", (req, res) => {
  res.send({
    message: "Welcome to " + packagejson.name,
  });
});

// ----- Error Handler -----
app.use(require("./src/middlewares/errorHandler"));

// ----- listenning server -----
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
