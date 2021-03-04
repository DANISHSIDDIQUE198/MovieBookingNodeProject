const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
     
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
const Admind = new mongoose.model("admindb", adminSchema);
module.exports = Admind;