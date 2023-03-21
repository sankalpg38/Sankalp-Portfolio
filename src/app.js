const express = require('express');
require("./db/conn");
const path = require('path');
const hbs = require('hbs');
const User = require("./models/usermessage");

const app = express();
const port = process.env.PORT || 3000;


const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.static(staticpath));
app.use(express.urlencoded({extended:false}));


app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);

app.get("/", (req, res)=>{
    res.render("index")
})


app.post("/contact", async(req,res)=>{
    try{
        // res.send(req.body);
        const userData = new User(req.body);
        const exist=await User.find({email:req.body.email});
        // if(exist)
        // {
        //     console.log('email exist');
        //     exist = false
        //     return res.status(500).render("error");
        // }
        await userData.save();
        //alert("Message sent Successfully!")
        
        return res.status(201).render("index");
    }catch(error){
       return  res.status(500).render("error");
    }
})


app.listen(port, ()=>{
    console.log(`server is running at port number ${port}`);
})