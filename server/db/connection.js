const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.URL



mongoose.connection.once('open', ()=>{
    console.log("MongoDB connection reday");
})

mongoose.connection.on('error', (err)=>{
    console.error(err);
})

async function mongoConnect(){
    await mongoose.connect(URL)
    
}
async function mongoDisconnect(){
    await mongoose.disconnect()
    
}

module.exports = {mongoConnect, mongoDisconnect};