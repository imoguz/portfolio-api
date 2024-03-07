"use strict";

const router = require("express").Router();
const {
  create,
  readMany,
  readOne,
  update,
  _delete,
} = require("../controllers/project.controller");

router.route("/").get(readMany).post(create);
router.route("/:id").get(readOne).put(update).delete(_delete);

module.exports = router;
