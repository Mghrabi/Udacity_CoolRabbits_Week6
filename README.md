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
| Verp   | Route                | operation          |
|--------|----------------------|--------------------|
| GET    | '/users'             | index students     |
| GET    | '/get_user/:id'      | show one student   |
| POST   | '/add-users'         | create user        |
| POST   | '/authenticate'      | authenticate       |
| GET    | '/session'           | index all sessions |
| POST   | '/session/:id'       | show one session   |
| DELETE | '/session/:id'       | delete session     |
| POST   | '/user/addtosession' | create one session |