const mongoose = require('mongoose');


const URL = "mongodb+srv://nasa:MOzRaRKnbvcp9Ado@cluster0.33slg.mongodb.net/nasaDB?retryWrites=true&w=majority";



mongoose.connection.once('open', () => {
    console.log("MongoDB connection reday");
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})

async function mongoConnect() {
    await mongoose.connect(URL)

}
async function mongoDisconnect() {
    await mongoose.disconnect()

}

module.exports = { mongoConnect, mongoDisconnect };