
const http = require('http');
const connect = require('../db/connection');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');
const PORT = process.env.PORT || 8000;


const server = http.createServer(app);

/** Connection DB */
connect();

async function startServer(){
    await loadPlanetsData();
 
    server.listen(PORT, ()=>{
        console.log(`This app is running on${PORT}..`);
    })
}

startServer();


