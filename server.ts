import express, { Express, Request, Response } from 'express';
import router from './router';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
    res.json({"message":"Ok"})
});

app.use('/api', router)



app.listen(port, ()=>{
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})