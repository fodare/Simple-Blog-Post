const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent =
   "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?";

const aboutContent =
   "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?";

const contactContent =
   "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// ********* Variables ************* // 
let posts = []

// ********* GET Requests ************* // 

// Home Route
app.get("/", function (req, res) {
   res.render("home", { 
      startingcontetnt: homeStartingContent, 
      newPosts:posts });
});

// About me route
app.get("/about", function (req, res) {
   res.render("about", { abountStartingContent: aboutContent });
});

// Contact Me route
app.get("/contact", function(req, res){
   res.render("contact", {startContatContent:contactContent});
})

// Compose route
app.get("/compose", function(req, res){
   res.render("compose");
})

// Dynamic routing
app.get("/posts/:postName", function(req, res){
   const requstedTitle = _.lowerCase(req.params.postName);

   posts.forEach(function(post){
      const storedTitle = _.lowerCase(post.title);

      if(storedTitle === requstedTitle){
         res.render("post", {
            title: post.title, 
            content: post.body
         });
         
      } 
   });
});


// ********* POST Requests ************* // 

app.post("/compose", function(req, res){
   const post = {
      title: req.body.postTitle,
      body: req.body.postBody
   };
   posts.push(post);
   
   res.redirect("/")
})


app.listen(3000, function () {
   console.log("Server running on port 3000");
});
