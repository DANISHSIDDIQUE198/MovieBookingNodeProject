const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
     
    email:{
   
   },
   password:{

   },
   name:{

   },
   mobile:{

   },
   address:{
       
   }
})
const Userdb = new mongoose.model("userdb", userSchema);
module.exports = Userdb;