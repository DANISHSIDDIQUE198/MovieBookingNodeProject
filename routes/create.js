const express=require('express');
const Moviedb=require('../models/moviedb');
const routes = express.Router();


var bodyParser=require('body-parser');
var jsonParser=bodyParser.json();
//
var crypto=require("crypto");
var key="password";
var algo='aes256';
//
//
const jwt=require("jsonwebtoken");
var jwtKey="jwt";
//


routes.post("/admin/addMovie",  (req, res) => {
    
      const movie = new Moviedb({
        movie:req.body.movie,
        show:req.body.show,
        price:req.body.price,
        ability:req.body.ability
      })
  
      movie.save().then((result) => {
        res.status(201).json(result)
    
})
.catch((error) => console.warn(error))
})
        
function verifyToken(req,res,next){
  const bearHeader=req.headers['authorization'];
  if(typeof bearHeader !=='undefined'){
     const bearer=bearHeader.split(' ');
     req.token=bearer[1];
     jwt.verify(req.token, jwtKey, (err, authData)=>{
         if(err){
             res.json({result: err})
         }
         else{
             next();
         }
     })
  }
  else{
      res.send("Result:Token not provided")
  }

}
 

  module.exports = routes;