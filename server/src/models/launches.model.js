
let launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};



function getAllLaunches() {
    return  Array.from(launches.values())
}

function addNewLaunch(launch) {
    latestFlightNumber++;
 
    // console.log(launch,"model");
    launches.set(latestFlightNumber, Object.assign(launch, {
        suceess: true,
        upcoming: true,
        customer: ["ZTM", "NASA"],
        flightNumber: latestFlightNumber,
    })
    );
}


function existLaunchWithId(launchId){
   return launches.has(launchId)
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