const express = require("express");
const moviedb = require("../models/moviedb");
//
var crypto=require("crypto");
var key="password";
var algo='aes256';
//
//
const jwt=require("jsonwebtoken");
var jwtKey="jwt";
//


const routes = express.Router();

routes.get("/movie/list", (req,res)=>{
  moviedb.find().then((data)=>{
       res.json(data);
    })
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