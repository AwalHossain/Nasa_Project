
let launches = new Map();
const launchDatabase = require('./launch.mongo');
const planets = require("./planet.mongo")

let DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-452 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};





async function saveLaunch(launch){

    const planet = await planets.findOne({keplerName:launch.destination})
    console.log(planet,"save", launch.destination);
    if(!planet){
        throw new Error("NO matching planet found")
    }

    await launchDatabase.updateOne({
        flightNumber: launch.flightNumber
    },launch,{
        upsert: true,
    })
}



async function getLatestFlightNumber(){
    const latestLaunch = await launchDatabase.findOne({}).sort("-flightNumber")
    console.log(latestLaunch,"number");
    if(!latestLaunch){
       return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;

}


async function scheduleNewLaunch(lauch){
    let newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch =Object.assign(lauch,{
        success: true,
        upcoming: true,
        customers: ["ZTM", "NASA"],
        flightNumber: newFlightNumber,
    })

   await saveLaunch(newLaunch);
}



// function addNewLaunch(launch) {
//     latestFlightNumber++;
 
//     // console.log(launch,"model");
//     launches.set(latestFlightNumber, Object.assign(launch, {
//         suceess: true,
//         upcoming: true,
//         customers: ["ZTM", "NASA"],
//         flightNumber: latestFlightNumber,
//     })

//     );
// }


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
    scheduleNewLaunch,
    getAllLaunches,
    abortLaunchById
}