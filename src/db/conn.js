const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/employRegistration")
.then(()=>{
    console.log("connection successfull")
}).catch((e)=>{
    console.log(e)
})