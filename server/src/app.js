const express = require('express');
const planetRoute = require('../src/routes/planets/planets.router')
const app = express();
const cors = require('cors');
const path = require('path')
const launchRouter = require('./routes/launches/launches.router')

app.use(cors({
    origin:"http://localhost:3000"
}));

app.use(express.json());
// app.use(express.static(path.join(__dirname, "..", "public")))


app.use('/getPlanet', planetRoute);
app.use('/launches', launchRouter)




module.exports = app;