const express = require("express");
const app = express();

app.use(express.urlencoded({extended:true}));


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