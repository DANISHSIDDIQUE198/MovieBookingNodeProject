const express = require("express");
const Moviedb = require("./models/moviedb");
const Admind = require("./models/admindb");
const Userdb = require("./models/userdb");
const app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
//
var crypto = require("crypto");
var key = "password";
var algo = 'aes256';
//
const jwt = require("jsonwebtoken");
var jwtKey = "jwt";
//

require("./db/connection");
const { Mongoose } = require("mongoose");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/admin/registration', jsonParser, (req, res) => {
    var cipher = crypto.createCipher(algo, key);
    var encrypted = cipher.update(req.body.password, 'utf8', 'hex')
        + cipher.final('hex');
    console.warn(req.body, encrypted);

    const admindb = new Admind({

        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address,


    })
    admindb.save().then((result) => {

        jwt.sign({ result }, jwtKey, { expiresIn: '300s' }, (err, token) => {
            res.status(201).json({ token })
        })

    }).catch((err) => console.warn(err)
    )

    // res.send("hello");
})

//  admin login API

app.post('/admin/login', jsonParser, (req, res) => {

    Admind.findOne({ email: req.body.email , password: req.body.password }).then((data) => {
        res.status(200).json(data)

    })
        .catch((error) => console.warn(error))
})



//  user registrion API

app.post('/user/registeration', jsonParser, (req, res) => {
   

    const userdb = new Userdb({

        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address,


    })
    userdb.save().then((result) => {
            res.status(201).json(result)
        

    }).catch((err) => console.warn(err)
    )


})

// user login API


app.post('/user/login', jsonParser, (req, res) => {
    Userdb.findOne({ email: req.body.email , password: req.body.password  }).then((data) => {
        res.status(200).json(data)
    })
        .catch((error) => console.warn(error))
})

app.get("/user/list", (req, res) => {
    Userdb.find().then((data) => {
        res.json(data);
    })
})

//function for veryfying token
function verifyToken(req, res, next) {
    const bearHeader = req.headers['authorization'];
    if (typeof bearHeader !== 'undefined') {
        const bearer = bearHeader.split(' ');
        req.token = bearer[1];
        jwt.verify(req.token, jwtKey, (err, authData) => {
            if (err) {
                res.json({ result: err })
            }
            else {
                next();
            }
        })
    }
    else {
        res.send("Result:Token not provided")
    }

}

const acreate = require("./routes/create");
const bdelete = require("./routes/delete");
const cupdate = require("./routes/update");
const dlist = require("./routes/list");

app.use(acreate);
app.use(bdelete);
app.use(cupdate);
app.use(dlist);





app.listen(5000, () => {
    console.log("Server running on port 5000");
})
