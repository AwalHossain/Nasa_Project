
let launches = new Map();
const launchDatabase = require('./launch.mongo');
const planets = require("./planet.mongo")

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-452 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};


saveLaunch(launch);


async function saveLaunch(launch){

    const planet = await planets.findOne({keplerName:launch.target})
console.log(launch.target,"how it found", planet);
    if(!planet){
        throw new Error("NO matching planet found")
    }



    await launchDatabase.updateOne({
        flightNumber: launch.flightNumber
    },launch,{
        upsert: true,
    })
}

function addNewLaunch(launch) {
    latestFlightNumber++;
 
    // console.log(launch,"model");
    launches.set(latestFlightNumber, Object.assign(launch, {
        suceess: true,
        upcoming: true,
        customers: ["ZTM", "NASA"],
        flightNumber: latestFlightNumber,
    })

    );
}


function existLaunchWithId(launchId){
   return launches.has(launchId)
}



async function getAllLaunches(){
    return await launchDatabase.find({},{"_id":0,"__v":0})
}


function abortLaunchById(launchId){
   const aborted = launches.get(launchId);
   aborted.upcoming = false;
   aborted.success = false;

   return aborted;

}






module.exports = {
    existLaunchWithId,
    addNewLaunch,
    getAllLaunches,
    abortLaunchById
}