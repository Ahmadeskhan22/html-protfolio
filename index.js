const express = require("express");
const mongoose = require("mongoose");

// Cleaner way to require your model
const Article = require("./models/Article");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://ahmadeskhan:LzVIAtLGSwpGwb6y@cluster0.fn3gnas.mongodb.net/?appName=Cluster0",
  )
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Error connecting with database: ", err);
  });

app.get("/hellow", (req, res) => {
  res.send("hello");
});

// FIXED: Removed trailing space in route, used req.params instead of req.body
app.get("/findSum/:number1/:number2", (req, res) => {
  const num1 = req.params.number1;
  const num2 = req.params.number2;

  res.send(`The numbers are ${num1} and ${num2}`);
});

// FIXED: Matched the variable name "number" in the response
app.get("/numbers", (req, res) => {
  let number = "";
  for (let i = 0; i <= 100; i++) {
    number += i + "-";
  }
  res.send(`the numbers are: ${number} `);
});

// FIXED: Used res.sendFile instead of res.send
app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});
app.post("/articles", async (req, res) => {
  const newArticle = new Article();
  const articleTitle = req.body.articleTitle;
  const articleBody = req.body.articleBody;
  //res.send(articleTitle+" "+ articleBody);
  newArticle.title = articleTitle;
  newArticle.body = articleBody;
  newArticle.numberOfLikes = 22;
  await newArticle.save();
  res.send("the new article has been stored");
});

app.get("/articles/:id", async (req, res) => {
  const id = req.params;
  try {
    const articles = Article.findByI
    d(id);
  } catch (error) {
    console.log("error while reading article of id", id);
  }
  res.json(articles);
});


app.delete("/articles/:id", async (req, res) => {
  const id = req.find(findByIdAndDelete);
  try {
    const articles = Article.findByIdAndUpdate(id);
    res.send("Delete articles is succsess")
  } catch (error) {
    console.log("error while reading article of id", id);
  }
  res.json(articles);
});
 
app.get("/showArticles",async (req,res)=> {
const articles= await Articles.find();
res.render("articles.ejs");
        
});





app.listen(3000, () => {
  console.log("I am listening on port 3000");
});
