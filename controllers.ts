import { Request, Response } from "express";
import { dataFlights } from "./data";
import Flights from "./models/models";





const url = require('url')

const flights = (departure: string, arrival: string ) =>{
    let flights : any[] = [];
    let arrivalFlights: any[] = [];
    let departureFlights: any[] = [];

  
    dataFlights.find( data => {
        if(data.departureDestination === departure && data.arrivalDestination === arrival){
          flights.push(data)
           }
        });

    dataFlights.find(data => {
        if(data.departureDestination !== departure && data.arrivalDestination === arrival){
            arrivalFlights.push(data)
            dataFlights.find( data => {
                if(data.departureDestination === departure){
                    departureFlights.push(data)  
                    return flights = departureFlights.concat(arrivalFlights)
 
                }
            })
        }
    })
    return flights
}

const schedule = (departureAt:string, arrivalAt:string) => {
    let scheduleFlights : any[] = []
    dataFlights.map( data => {
        data.itineraries.filter( scheduleData => {
            if(scheduleData.departureAt === departureAt || scheduleData.arrivalAt === arrivalAt){
                scheduleFlights.push(scheduleData )  
            }
        })
    })
    return scheduleFlights;
}



export const readAllFlights = async (req: Request, res: Response) =>{
    return Flights.find()
    .then((flights) => res.status(200).json({ flights }))
    .catch((error) => res.status(500).json({ error }));
}


export const readConnections = (req: Request, res: Response) => {
    const { query } = url.parse(req.url, true)
    const departure = query.departure.charAt(0).toUpperCase() + query.departure.slice(1);
    const arrival = query.arrival.charAt(0).toUpperCase() + query.arrival.slice(1);
    const flightsResults = flights(departure, arrival);
    res.status(200).send(flightsResults)
}

export const readSchedule =  (req: Request, res: Response) => {
    const { query } = url.parse(req.url, true)
    const departureAt = query.departureAt;
    const arrivalAt = query.arrivalAt;
    const scheduleResults = schedule(departureAt, arrivalAt);
    res.status(200).send(scheduleResults)
}


// export const connectingFLights = (req: Request, res: Response) =>{
//     const { query } = url.parse(req.url, true)
//     const departure = query.departure.charAt(0).toUpperCase() + query.departure.slice(1);
//     const arrival = query.arrival.charAt(0).toUpperCase() + query.arrival.slice(1);
//     const flightsConnectionResults = flightsConnections(departure, arrival);
//     res.status(200).send(flightsConnectionResults)

// }