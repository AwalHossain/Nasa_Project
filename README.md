# NASA Mission Control Dashboard

This project is a dashboard that was designed and developed to schedule missions targeting Kepler exo-planets for NASA mission control.

![image](https://user-images.githubusercontent.com/80216813/221490036-ff00db10-a07b-487a-a671-3d1e74c013f7.png)


## Technologies Used

-   NodeJS
-   ReactJS
-   AWS
-   Docker
-   ExpressJS
-   MongoDB
-   Mongoose-Schema
-   Jest


## Key Features

-   **Continuous Integration/Development Pipeline Integration:** A pipeline was established to integrate continuous integration/development to ensure smooth deployment and release of new features.
    
-   **API Testing:** The APIs were thoroughly tested by Jest to ensure that they met the project requirements and were functioning correctly.
    
-   **Deployment with Docker on AWS EC2:** Docker was used to deploy the project on an AWS EC2 instance, which enabled the project to be easily scaled and managed.
    
-   **MongoDB Data Management with Mongoose Schema:** Mongoose schema was applied for MongoDB data management to ensure that the data was organized and easily accessible.


![image](https://user-images.githubusercontent.com/80216813/221490226-b3710a5c-ac51-4093-970e-a1f2845d73a6.png)



## Running the Project

1. In the terminal, run: `npm run deploy`
2. Browse to the mission control frontend at [localhost:8000](http://localhost:8000) and schedule an interstellar launch!

## Docker

1. Ensure you have the latest version of Docker installed
2. Run `docker build -t nasa-project .`
3. Run `docker run -it -p 8000:8000 nasa-project`

## Running the Tests

To run any automated tests, run `npm test`. This will: 
* Run all the client-side tests: `npm test --prefix client`
* Run all the server-side tests: `npm test --prefix server` 
