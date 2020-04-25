const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const logger = require("pino")();
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
let posts = [];
app.get("/posts", (req, res) => {
  res.status(201).send(posts);
  logger.info(posts);
});
app.post("/posts", (req, res) => {
  const { title } = req.body;
  const id = randomBytes(6).toString("hex");
  const post = {
    id,
    title,
  };
  posts = [...posts, post];
  res.status(201).send(post);
  logger.info(posts);
});
app.listen(3001, () => {
  logger.info("app is running on port " + 3001);
});
