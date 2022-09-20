const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const api = require('./routes/api');



app.use("/v1", api)


app.use(cors({
    origin:"http://localhost:3000"
}));

app.use(express.json());
// app.use(express.static(path.join(__dirname, "..", "public")))






module.exports = app;