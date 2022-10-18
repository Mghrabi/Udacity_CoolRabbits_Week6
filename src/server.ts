import express, { Request, Response, Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {authorizationMiddleWare} from './utilities/authorization'
import students_routes from "./handlers/students";
import sessionRouter from "./handlers/sessions";
import studentsInSessionRouter from "./handlers/studentsSession";
const app: Application = express();
const address: string = "0.0.0.0:3000";
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
import dotenv from "dotenv";
dotenv.config();
// createHash('1');


app.use(cors());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});
students_routes(app);
app.use('/session', authorizationMiddleWare, sessionRouter);
app.use('/user/addtosession', authorizationMiddleWare,studentsInSessionRouter);
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});


export default app;
