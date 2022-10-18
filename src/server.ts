import express, { Request, Response, Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./handlers/sessions";
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
app.use('/session', router);
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});


export default app;
