"use strict";

const router = require("express").Router();

router.use("/projects", require("./project.route"));

module.exports = router;
