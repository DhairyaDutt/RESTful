const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({extended:true}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");

const comments = [
    {
        id: 1,
        username: "Vijeet",
        comment: "I am shifting to UP"
    },
    {
        id:2,
        username: "Yash",
        comment: "Tommorow I'll come on my activa"
    },
    {
        id: 3,
        username: "Kartik",
        comment: "It's so far away"
    },
    {
        id: 4,
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
    comments.push({username,comment});
    res.redirect("/comments");
});

app.get("/comments/:id",(req,res) =>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === parseInt(id));
    res.render("comments/show",{comment});

})




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