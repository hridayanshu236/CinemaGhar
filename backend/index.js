const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require('./models/User.js')
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/CinemaGhar")

app.post("/login", (req, res) =>{
    const{email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user =>{
        if(user) {
            if(user.password == password) {
                res.json("Success")
            }else{
                res.json("Password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
})
app.post('/signup', (req, res) => {
    UserModel.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(err => {
        console.error(err);
        res.status(400).json({ error: "Unable to create user", details: err });
      });
  });
  

app.listen(3001, () => {
    console.log("Server is running")
})