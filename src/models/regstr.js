const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const employeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpasword:{
        type:String,
        required:true
    }
})
employeSchema.pre("save",async function(next){
      const salt=await bcrypt.genSalt();
      this.password=await bcrypt.hash(this.password,salt)
      this.confirmpasword=undefined;

    next();
})

// now we need to create a collection
const Register=new mongoose.model("Register", employeSchema);
module.exports=Register;