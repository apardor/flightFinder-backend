import { Request, Response } from "express";
import { dataFlights } from "./data";
const url = require('url')


const flights = (departure: string, arrival: string ) =>{
 let directFlights : any[] = []
 dataFlights.filter( data => {
    if(data.departureDestination === departure && data.arrivalDestination === arrival){
        directFlights.push(data.itineraries)
    }
    });
return directFlights;
}

const schedule = (departureAt:string, arrivalAt:string) => {
    let scheduleFlights : any[] = []
    console.log(scheduleFlights, 'here is array');
    
    dataFlights.map( data => {
        data.itineraries.filter( scheduleData => {
            if(scheduleData.departureAt === departureAt || scheduleData.arrivalAt === arrivalAt){
                scheduleFlights.push(scheduleData )  
            }
        })
    })
    return scheduleFlights;

}

export const readAllFlights = (req: Request, res: Response) =>{
    res.status(200).send(dataFlights);
}


export const readConnections = (req: Request, res: Response) => {
    const { query } = url.parse(req.url, true)
    const departure = query.departure.charAt(0).toUpperCase() + query.departure.slice(1);
    const arrival = query.arrival.charAt(0).toUpperCase() + query.arrival.slice(1);
    const flightsResults = flights(departure, arrival);
    res.status(200).send(flightsResults)
}

export const readSchedule = (req: Request, res: Response) => {
    const { query } = url.parse(req.url, true)
    const departureAt = query.departureAt;
    const arrivalAt = query.arrivalAt;
    const scheduleResults = schedule(departureAt, arrivalAt);
    res.status(200).send(scheduleResults)
}