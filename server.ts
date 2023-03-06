import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.get("/api",  (req: Request, res: Response)=>{
    res.json({"users": ["user1", "user2", "user3"]})
})


app.listen(port, ()=>{
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})