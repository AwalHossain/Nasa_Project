
const launchDatabase = require('./launch.mongo');
const planets = require("./planet.mongo")
const axios = require('axios')
let DEFAULT_FLIGHT_NUMBER = 100;


const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function populateLaunches() {
    const response = await axios.post(SPACEX_API_URL, {
        "query": {},
        "options": {
        "pagination":false,
          "populate": [
            {
              "path": "rocket",
              "select": {
                "name": 1
              }
            },
            {
              "path": "payloads",
              "select": {
                "customers": 1
              }
            }
          ]
          
        }
    })

    if(response.status !== 200){
        console.log('Problem downloading launch data');
        throw new Error('Launch data download failed');
    }

    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers']
        })

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        }

    console.log(`${launch.flightNumber} ${launch.customers}`);
        await saveLaunch(launch);
    }
}



async function loadLaunchData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    })
    console.log(firstLaunch,"odao");
    if (firstLaunch) {
        console.log('Launch data already loaded!');
    } else {
        await populateLaunches();
    }

}


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





async function saveLaunch(launch) {

 const response =   await launchDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true,
    })

}



async function getLatestFlightNumber() {
    const latestLaunch = await launchDatabase.findOne({}).sort("-flightNumber")
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;

}


async function scheduleNewLaunch(lauch) {
    let newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(lauch, {
        success: true,
        upcoming: true,
        customers: ["ZTM", "NASA"],
        flightNumber: newFlightNumber,
    })

    await saveLaunch(newLaunch);
}


async function findLaunch(filter) {
    return await launchDatabase.findOne(filter)
}


async function existLaunchWithId(launchId) {
    const getId = await findLaunch({
        flightNumber: launchId
    })
    return getId;
}



async function getAllLaunches(skip, limit) {
    console.log("ist it workin");
    let data = await launchDatabase.find({})
    .sort({flightNumber:1})
    .skip(skip)
    .limit(limit);

    return data;
}


async function abortLaunchById(launchId) {

    const aborted = await launchDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false
    }
    )

    console.log(aborted, "getting abor");

    return (aborted.matchedCount === 1 && aborted.modifiedCount === 1)


}






module.exports = {
    existLaunchWithId,
    loadLaunchData,
    scheduleNewLaunch,
    getAllLaunches,
    abortLaunchById
}