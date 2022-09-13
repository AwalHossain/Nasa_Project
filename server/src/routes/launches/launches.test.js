const request = require('supertest');
const app = require('../../app');



describe('Test GET /launches', ()=>{
    test("It should respond with 200 success", async()=>{
        const response = await request(app)
        .get('/launches')
        .expect("Content-Type", /json/)
        .expect(200);

        expect(response.statusCode).toBe(200);
    });
})



describe("Test POST /launch", ()=>{
  
        const completeLaunchData = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-186 f',
            launchDate: 'January 4, 2028',
          };
        
          const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-186 f',
          };
        
          const launchDataWithInvalidDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-186 f',
            launchDate: 'zoot',
          };
          test("It should return with 201", async()=>{

              const response = await request(app)
              .post('/launches')
              .expect("Content-Type", /json/)
              .send(completeLaunchData)
              .expect(201)
          });

          test("It should return an invlid data", async()=>{

            const response = await request(app)
            .post('/launches')
            .expect("Content-Type", /json/)
            .send(launchDataWithInvalidDate)
            .expect(400)

            expect(response.body).toStrictEqual({
                error:"Invalid launch date"
            })
          })



    test("It should catch invalid dates", ()=>{});
})