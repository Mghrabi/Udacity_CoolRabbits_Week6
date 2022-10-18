# PROJECT SETUP
* Run npm install
* Add .env file and add necessary variables 
    1. DB_USERNAME
    2. HOST
    3. DATABASE=week6 (Or you can chage it)
    4. PASSWORD
    5. TOKEN_SECRET

* Create a database called (week6)
* Run (npm run migration)
* Run (npm run watch)

## End Points
- GET '/users' index
- GET '/get_user/:id' show
- POST '/add_users' create
- POST '/authenticate' authenticate
- GET '/session' index
- POST '/session' create
- GET '/session/:id' show
- DELETE '/session/:id' delete
- POST '/user/addtosession' create