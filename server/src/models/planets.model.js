
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const planets = require('./planet.mongo');


const habitablePlanets = [];


function isHabitablePlanet(planet) {

    return planet['koi_disposition'] === 'CONFIRMED'
      && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
      && planet['koi_prad'] < 1.6;
  }

async function loadPlanetsData(){

    return new Promise((resolve, reject)=>{
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true,
          }))
          .on('data', async (data) => {
            if (isHabitablePlanet(data)) {
              // console.log(data.kepler_name);
             await savePlanet(data);
            }
          })
          .on('error', (err) => {
            console.log(err);
            reject(err);
          })
          .on('end', async() => {
            const countPlanetFound =  (await getAllPlanets()).length;
            console.log(`${countPlanetFound} habitable planets found!`);
            resolve();
          });
    })
}



async function getAllPlanets (){
   return await planets.find({},{
    "_id":0,"__v":0,
   })
}


async function savePlanet(data){
  try{
    await planets.updateOne({
      keplerName: data.kepler_name
    },{
      keplerName: data.kepler_name
    },
    {
      upsert: true
    }
    )
  }catch(err){
console.error(`Could not save planet ${err}`);
  }
}



module.exports = {
    loadPlanetsData,
    getAllPlanets
}