const express = require('express');
const planetRoute = require('../src/routes/planets/planets.router')
const app = express();
const cors = require('cors');

app.use(cors({
    origin:"http://localhost:3000"
}));


app.use('/getPlanet', planetRoute);





module.exports = app;