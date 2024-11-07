const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const {MongoClient} = require('mongodb');
const data = require('./data/auth.json');
const uri = "mongodb+srv://Aaron:Aaron@cluster6112.z4k6m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster6112"
const app = express();
app.use(cors())

const client = new MongoClient(uri);

//app.use(cors())

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
        //const documents = await collection.find({})
        //res.send(documents).status(200);
        //console.log(documents)
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
        const db = await client.db("5166-final");
        const collection = await db.collection("report");
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
        let user = req.query.user
        let pass = req.query.pass;
        console.log(user, data.username, pass, data.password)
        if (user == data.username && pass == data.password){
            const jwtSecret = '976a12bec97b282b908b4151a6f8b7242a19ca4532b53312027c2f690628399e';
            let jwtData = {
                user: user
            }
            const token = jwt.sign(jwtData, jwtSecret);
            console.log(token);
            res.status(200).json({message: "Login successful", token});
        }
        else {
            res.status(403).send("Incorrect login info");
        }
    }catch {
        res.status(500).send("Error uploading user data");
      }
});
