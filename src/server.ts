import express, { Request, Response, Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app: Application = express();
const address: string = "0.0.0.0:3000";
app.use(bodyParser.json());
import dotenv from "dotenv";
dotenv.config();
// createHash('1');


app.use(cors());

app.get("/new", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});


export default app;
