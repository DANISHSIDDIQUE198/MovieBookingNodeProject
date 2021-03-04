
const express = require("express");
const Movies = require("../models/moviedb");
const routes = express.Router();

//
var crypto=require("crypto");
var key="password";
var algo='aes256';
//
//
const jwt=require("jsonwebtoken");
var jwtKey="jwt";
//


routes.delete("/admin/delete/:id", (req, res) => {
    Movies.deleteOne({ _id: req.params.id })
      .then(() => {
        res.send("Deleted sucessfully");
      })
      .catch((error) => console.log(error));
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