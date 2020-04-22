const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require('./models/post');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


mongoose.connect("mongodb+srv://luis:9um4PFh9Rdjg2vtr@cluster0-rb7hz.mongodb.net/test?retryWrites=true&w=majority").then(() =>{
  console.log('Connected to DB');
}).catch(() => {
  console.log('Connection Failed Epic')
});


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
//9um4PFh9Rdjg2vtr
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Success',
      posts: documents
    })
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted" });
  });
});

module.exports = app;
