const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const {MongoClient} = require('mongodb');
const data = require('./data/auth.json');
const uri = "mongodb+srv://Aaron:Aaron@cluster6112.z4k6m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster6112"
app.use(cors())
const client = new MongoClient(uri);

//database connection
mongoose.connect(uri)
    .then(()=> console.log("connected to mongoDB"))
    .catch(err => console.log(err));


//server running console message
app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});


//data fetch for summary page
app.get('/summary', async (req, res) => {
    try{
        await client.connect();
        const db = client.db("5166-final");
        const collection = db.collection("summary");
        const documents = await collection.find().toArray();
        res.send(documents).status(200);
    }catch (err){
        console.log(err);
    }finally {
        await client.close();
    }
})

//data fetch for report page
app.get('/report', async(req, res)=>{
    try{
        await client.connect();
        const db = client.db("5166-final");
        const collection = db.collection("report");
        const documents = await collection.find().toArray();
        res.send(documents).status(200);
    }catch (err){
        console.log(err);
    }finally {
        await client.close();
    }
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
