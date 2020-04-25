const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const logger = require("pino")();
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
let comments = [];
app.get("/posts/:post_id/comments", (req, res) => {
  res.status(200).send(comments);
  logger.info(comments);
});
app.post("/posts/:post_id/comments", (req, res) => {
  const { comment } = req.body;
  const { post_id } = req.params;
  const id = randomBytes(6).toString("hex");
  const comment_to_save = {
    id,
    comment,
  };
  comments = [...comments, comment_to_save];
  res.status(201).send(comment_to_save);
  logger.info(comment_to_save);
});
app.listen(3002, () => {
  logger.info("app is running on port " + 3002);
});
