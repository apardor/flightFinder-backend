import mongoose from "mongoose";
import { config } from '../config';



const flightsDB = mongoose.createConnection(config.mongo.url, { retryWrites: true, w: 'majority' })

const Schema = mongoose.Schema;

export interface IFlights{
    route_id: string;
    departureDestination: string;
    arrivalDestination: number;
    itineraries: [{
            flight_id: string,
            departureAt: string,
            arrivalAt: string,
            availableSeats: number,
            prices: {
                currency: string,
                adult: number,
                child: number
            }
          }]
  }

const FlightSchema = new Schema({
  route_id: String,
  departureDestination: String,
  arrivalDestination: Number,
  itineraries: [{
          flight_id: String,
          departureAt: String,
          arrivalAt: String,
          availableSeats: Number,
          prices: {
              currency: String,
              adult: Number,
              child: Number
          }
        }]
})

const Flights = flightsDB.model<IFlights>("flightsdbs", FlightSchema)


export default Flights;

