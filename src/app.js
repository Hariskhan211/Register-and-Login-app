const express=require("express");
const app=express();
const path=require("path")
const hbs=require("hbs")
const bcrypt=require("bcrypt");
require("./db/conn");
const Register=require("./models/regstr")
const static_path=path.join(__dirname,"../public")
const template_path=path.join(__dirname,"../templates/views")
const partial_path=path.join(__dirname,"../templates/partials")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// console.log(path.join(__dirname,"../public"))
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path);
const port=process.env.PORT || 8000;
app.get("/",(req,res)=>{
    res.render("register");
});
app.get("/login",(req,res)=>{
  res.render("login")
})
app.get("/register",(req,res)=>{
  res.render("register")
})
// app.get("/register",(req,res)=>{
//   res.send("submitted")
// })
// create a new user in our database
app.post("/register", async (req,res)=>{
  try{
     const password=req.body.password;
     const cpassword=req.body.confirmpasword;
     if(password===cpassword){
      const registerEmploye=new Register({
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        gender:req.body.gender,
        password:req.body.password,
        confirmpasword:req.body.confirmpasword
      })
      const regist= await registerEmploye.save();
      console.log(regist)
      res.status(201).send("submitted");
      // res.send("submitted")
     } else{
        res.send("pasword are not matching")
     }
  } catch(err){
    res.status(400).send(err);
  }
});
// login check 
app.post("/login",async(req,res)=>{
  try{
    const email=req.body.email;
    const password=req.body.password;
    const userEmail=await Register.findOne({email});

    const isMatch=await bcrypt.compare(password,userEmail.password);
     if(isMatch || password===userEmail.password){
      res.status(201).send("you are logged in")
     } else{
      res.send("invalid login details")
     }
  } catch(err){
    res.status(400).send("envalid email")
  }
})
app.listen(port,()=>{
    console.log(`server is runing at port no ${port}`)
})