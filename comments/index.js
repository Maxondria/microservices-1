const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commenId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commenId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "COMMENT_CREATED",
    data: { id: commenId, content, postId: req.params.id, status: "pending" },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Received: ", req.body.type);
  const { type, data } = req.body;

  if (type === "COMMENT_MODERATED") {
    const { id, postId, content, status } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comm) => comm.id === id);
    comment.status = status;

    await axios.post("http://localhost:4005/events", {
      type: "COMMENT_UPDATED",
      data: { id, postId, content, status },
    });
  }

  res.send({});
});

app.listen(4001, () => console.log("Listening on 4001"));
