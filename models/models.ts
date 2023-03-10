import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IFlights{
    route_id: string;
    departureDestination: string;
    arrivalDestination: string;
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
  arrivalDestination: String,
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

const Flights = mongoose.model<IFlights>("flightsdbs", FlightSchema)


export default Flights;

