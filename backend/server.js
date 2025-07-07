const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let posts = [];
let postId = 1;

// Get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Create a new post
app.post("/posts", (req, res) => {
  const newPost = {
    id: postId++,
    ...req.body,
    createdAt: new Date().toLocaleString()
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Edit a post
app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const index = posts.findIndex(p => p.id == id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...req.body };
    res.json(posts[index]);
  } else {
    res.status(404).send("Post not found");
  }
});

// Delete a post
app.delete("/posts/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.status(204).send();
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
