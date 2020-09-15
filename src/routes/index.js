const express = require("express");

const { createNote } = require("../controllers/index");

const apiRouter = express.Router();

apiRouter.post("/", (req, res) => {
  createNote(req, res);
});

module.exports = apiRouter;
