const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
import data from './data/auth.json';
import db from './connection';

app.use(cors())

//database connection
mongoose.connect(process.env.ATLAS_URI)
    .then(()=> console.log("connected to mongoDB"))
    .catch(err => console.log(err));


//server running console message
app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});


//data fetch for summary page
app.get('/summary', async (req, res) => {
    let collection = await db.collection("summary");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
})

//data fetch for report page
app.get('/report', async(req, res)=>{
    let collection = await db.collection("report");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
})

//logging in
app.post('/login', async (req, res)=>{
    try{
        let user = req.body.user;
        let pass = req.body.pass;
        if (user == data.username && pass == data.password){
            const jwtSecret = process.env.JWT_SECRET;
            let jwtData = {
                user: user
            }
            const token = jwt.sign(jwtData, jwtSecret);
            res.status(200).json({message: "Login successful", token});
        }
        else {
            res.status(403).send("Incorrect login info");
        }
    }catch {
        res.status(500).send("Error uploading user data");
      }
});
