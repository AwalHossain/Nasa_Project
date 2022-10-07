const { getAllLaunches, existLaunchWithId, abortLaunchById, scheduleNewLaunch } = require("../../models/launches.model");
const { getPagination } = require("../../services/query");



async function httpGetAllLaunches(req, res) {

    const { skip, limit } = getPagination(req.query);
    const all = await getAllLaunches(skip, limit);
    return res.status(200).json(all);
}


async function httpAddNewLaunch(req, res) {
    const launch = req.body;
    console.log(req.body, "checking", req.query);
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination) {
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }

    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date',
        });
    }

    await scheduleNewLaunch(launch)
    return res.status(201).json(launch)
}



async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    const existsLaunch = await existLaunchWithId(launchId);
    // if id is not valid
    if (!existsLaunch) {
        res.status(404).json({
            error: "Launch not found"
        })
    }

    // aborte mission
    const aborted = await abortLaunchById(launchId);

    if (!aborted) {
        return res.status(400).json({
            errr: "Launch not aborted"
        })
    }

    return res.status(200).json({ ok: "true" })
}



module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}