let express = require('express');
let app = express();
let PORT = process.env.PORT || 3000;
let path = require("path");
const { title } = require('process');
let mongoose = require("mongoose");
let Post = require("./models/postModel");
const { error } = require('console');
let methodOverride = require ("method-override");
let db = "mongodb+srv://Yufich:MrfkTtt5Kf9QNcP@cluster0.fa3k9.mongodb.net/Node-blog";

let createPath = (page) => path.join(__dirname, "views",`${page}.html`);
app.use(express.static(path.join(__dirname,"public")));

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));

app.get('/', (req, res)=>{
    res.render("yufi",{
        title:"Home"
    });
});

app.get("/about",(req, res) => {
    res.render ("about", {
        title: "About",
        content: "SMTH"

    });
});

app.get("/add-post",(req, res) => {
    res.render ("add-post", {
        title: "Please add post"

    });
});

app.post("/add-post",(req, res) => {
   let {title, author} = req.body;
   let post = new Post({title, author});
   post
    .save()
    .then(() => res.redirect("/posts"))
    .catch((error) => {
        console.log(error);
        res.render("error");
    });
    });


app.get("/posts",(req, res) => {
   Post.find()
    .then((posts) => res.render("posts", {title:
    "Posts", posts}))
    .catch((error) => {
        console.log(error);
        res.render("error");
    })
    });

app.get("/edit-post/:id", (req, res) => {
    let id = req.params.id;
    Post.findById(id)
     .then((post) =>
    res.render("edit-post", {title: post.
        title, id: post._id, post })
    )
     .catch((errror) => {
       console.log(error);
       res.render("error");
     });
    });

app.put("/edit-post/:id", (req, res) => {
    let id = req.params.id;
    const {title, author} = req.body;
    Post.findByIdAndUpdate(id, {title, author})
     .then(() => res.redirect(`/posts`))
     .catch((error) => {
        console.log(error);
        res.render(createPath("error"));
     });
});

app.delete("/posts/:id", (req, res) => {
    let id = req.params.id;
    Post.findByIdAndDelete(id)
    .then(() => res.render("posts", {title:
    "Post", posts}))
     .catch((error) => {
        console.log(error);
        res.render("error");
     });
});

async function start() {
   try {
    await mongoose.connect(db);
    console.log(`Connection to MongoDB is success!`);
    app.listen(PORT, () =>{
        console.log(`Server is listening PORT ${PORT}...
            `);
    });
   } catch (error) {
    console.log(" \n Connection error!!! \n\n, error");
   }
}
start();