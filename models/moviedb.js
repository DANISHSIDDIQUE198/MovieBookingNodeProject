const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    
    movie: {},
    show: {
        
      
    },
    price: {
       

    },
    ability: {
       
     },
    
})
const Moviedb = new mongoose.model("moviedb", employeeSchema);
module.exports = Moviedb;

