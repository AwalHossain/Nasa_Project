
const http = require('http');
const { mongoConnect } = require('../db/connection');
const app = require('./app');
const { loadLaunchData } = require('./models/launches.model');
const { loadPlanetsData } = require('./models/planets.model');
const PORT = process.env.PORT || 8000;
const env = require('dotenv');
app
console.log( process.env.VAL,"oel",PORT);


const server = http.createServer(app);


async function startServer(){
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();
    server.listen(PORT, ()=>{
        console.log(`This app is running on${PORT}..`);
    })
}

startServer();


