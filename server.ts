import express, { Express, Request, Response } from 'express';
import router from './router';
import mongoose from 'mongoose';
import { config } from './config';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
.then(()=>{ 
    console.log('connected to mongoose');
})
.catch(error => {console.log(error)})


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