const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const {v4: uuid} = require("uuid");


app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");

let comments = [
    {
        id: uuid(),
        username: "Vijeet",
        comment: "I am shifting to UP"
    },
    {
        id: uuid(),
        username: "Yash",
        comment: "Tommorow I'll come on my activa"
    },
    {
        id: uuid(),
        username: "Kartik",
        comment: "It's so far away"
    },
    {
        id: uuid(),
        username: "Parth",
        comment: "I'll come maybe, I'm not sure"
    }
];


app.get("/comments",(req,res) =>{
    res.render("comments/index",{comments});
});

app.get("/comments/new",(req,res) =>{
    res.render("comments/new");
});

app.post("/comments",(req,res) =>{
    const {username,comment} = req.body;
    comments.push({username,comment, id:uuid()});
    res.redirect("/comments");
});

app.get("/comments/:id",(req,res) =>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("comments/show",{comment});

});

app.get("/comments/:id/edit",(req,res) =>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("comments/edit",{comment});
});

app.patch("/comments/:id",(req,res) =>{
    const {id} = req.params;
    const newCommentText = req.body.comment;
    const foundCommentText = comments.find(c => c.id === id);
    foundCommentText.comment = newCommentText;
    res.redirect("/comments");
});

app.delete("/comments/:id",(req,res) =>{
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect("/comments");
});





app.get("/pizza",(req,res) =>{
    res.send("GET request");
});

app.post("/pizza",(req,res) =>{
    const {pizza,qty} = req.body;
    res.send(`Here is your order: ${qty} ${pizza} pizza`);
});

app.listen(3000, () =>{
    console.log("PORT 3000 running!!");
})