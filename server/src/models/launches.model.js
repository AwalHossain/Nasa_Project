
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

module.exports = {
    addNewLaunch,
    getAllLaunches
}