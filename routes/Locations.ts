import express, { Express, Request, response, Response, Router } from 'express';
import { Locations } from '../models/ILocations';

const router = express.Router()

let departureDestination;
let arrivalDestination;

router.get(`/locations-${departureDestination}-${arrivalDestination}`, (req: Request, res: Response) => {
    res.send
})