const request = require('supertest');
const { mongoConnect, mongoDisconnect } = require('../../../db/connection');
const app = require('../../app');
const { loadPlanetsData } = require('../../models/planets.model');



describe("Launches API",()=>{
  beforeAll(async ()=>{
   await mongoConnect();
    // await loadPlanetsData();
  },14000)

  afterAll( async()=>{
    await mongoDisconnect();
  })


  describe('Test GET /launches', ()=>{
    test("It should respond with 200 success", async()=>{
        const response = await request(app)
        .get('/v1/launches')
        .expect("Content-Type", /json/)
        .expect(200);
        expect(response.statusCode).toBe(200);
    });
})



describe("Test POST /launch", ()=>{
  
        const completeLaunchData ={
          mission:"i want",
          launchDate:"23January 2025",
          rocket:"ldaofd 3k3",
          destination:"Kepler-296 A f"
        }
        
          const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            destination: 'Kepler-186 f',
          };
        
          const launchDataWithInvalidDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            destination: 'Kepler-186 f',
            launchDate: 'zoot',
          };
          test("It should return with 201", async()=>{

              const response = await request(app)
              .post('/v1/launches')
              .expect("Content-Type", /json/)
              .send(completeLaunchData)
              .expect(201)
          });

          test("It should return an invlid data", async()=>{

            const response = await request(app)
            .post('/v1/launches')
            .expect("Content-Type", /json/)
            .send(launchDataWithInvalidDate)
            .expect(400)

            expect(response.body).toStrictEqual({
                error:"Invalid launch date"
            })
          })



    test("It should catch invalid dates", ()=>{});
})


})


// jest.setTimeout(30000)