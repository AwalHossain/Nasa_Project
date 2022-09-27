const planetRoute = require('./planets/planets.router');
const launchRouter = require('./launches/launches.router');

const api = require('express').Router();


api.use('/getPlanet', planetRoute);
api.use('/launches', launchRouter)



module.exports = api