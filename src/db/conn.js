const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://sankalpg38:sankalp@cluster0.eeixcut.mongodb.net/NodejsProject?retryWrites=true&w=majority").then(()=>{
    console.log("connection successfull");
}).catch((error)=>{
    console.log(error);
})