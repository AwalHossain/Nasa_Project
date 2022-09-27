const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const api = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/v1", api)

app.post('/gey', (req,res)=>{
    console.log(req.body);
})


// app.use(express.static(path.join(__dirname, "..", "public")))






module.exports = app;