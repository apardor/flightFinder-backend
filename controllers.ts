import { Request, Response } from "express";
import { dataFlights } from "./data";
import Flights from "./models/models";

const url = require('url')

const flights = async (departure: string, arrival: string ) =>{
    const direct =  await Flights.find({departureDestination: departure, arrivalDestination: arrival})
    const departureDest =  await Flights.find({departureDestination: departure,  arrivalDestination: { $ne: arrival }})
    const arrivalDest =  await Flights.find({departureDestination: { $ne: departure }, arrivalDestination: arrival})
    const connectingFlights =  departureDest.concat(arrivalDest)

    if (direct.length > 0) {
        return direct
    }  else if(departureDest.length > 0 && arrivalDest.length > 0){
        return  connectingFlights
    }
}


const schedule = async (departureAt:string, arrivalAt:string) => {
    let scheduleFlights : any[] = []
    const allFlights = await Flights.find({});
    allFlights.map( data => {        
        data.itineraries.filter( scheduleData => {
            if(scheduleData.departureAt === departureAt || scheduleData.arrivalAt === arrivalAt){
                 scheduleFlights.push(scheduleData)
            }
        })
    })
    return scheduleFlights;
}

const book = async (flightID:string) =>{
    const book = await Flights.findById({flightID });
    return book

}



export const readAllFlights = async (req: Request, res: Response) =>{
    try {
        const allFlights = await Flights.find({});
        res.status(200).send(allFlights);
      } catch (e:any) {
        console.log(e.message);
        return
      }
}


export const readConnections = async (req: Request, res: Response) => {
    try{
        const { query } = url.parse(req.url, true)
        const departure = query.departure
        const arrival = query.arrival
        const flightsResults = await flights(departure, arrival);
        res.status(200).send(flightsResults)
    } catch (e:any) {
        console.log(e.message);
        return
      }
}

export const readSchedule =  async (req: Request, res: Response) => {
    try{
        const { query } = url.parse(req.url, true)
        const departureAt = query.departureAt;
        const arrivalAt = query.arrivalAt;
        const scheduleResults = await schedule(departureAt, arrivalAt);
        res.status(200).send(scheduleResults)
    }catch (e:any) {
        console.log(e.message);
        return
      }
}

export const booking =  async (req: Request, res: Response) => {
    try{
        const { query } = url.parse(req.url, true)
        const flightID = query.flight_id;
        const booking = await book(flightID);
        res.status(200).send(booking)
    }catch (e:any) {
        console.log(e.message);
        return
      }
}

