import { HttpException, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { db } from "src/database/db";
import { flights } from "src/database/schema";
import { FlightDto } from "src/dto/flights.dto";
import { v4 as uuid } from "uuid";

@Injectable()
export class AdminFlightsService {
    
    async createFlight(flight: FlightDto){

        if(!flight.airline || !flight.seats || !flight.flightNumber || !flight.origin || !flight.destination || !flight.departureTime || !flight.arrivalTime){
            throw new HttpException("Missing required fields", 400);
        }

        const flightData = {
            id: uuid(),
            airline: String(flight.airline),
            seats: Number(flight.seats),
            flightNumber: String(flight.flightNumber),
            origin: String(flight.origin),
            destination: String(flight.destination),
            departureTime: String(flight.departureTime),
            arrivalTime: String(flight.arrivalTime),
            remainingSeats: Number(flight.seats),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        
        const insertFlight = await db.insert(flights).values(flightData)
        if (!insertFlight) {
            throw new HttpException("Failed to insert flight", 500);
        }

        return { message: "Flight created successfully", flight: flightData};

    }

    async updateFlight(flight: FlightDto, id: string){
        
        const [existingFlight]: FlightDto[] = await db.select().from(flights).where(eq(flights.id, id))
        if (!existingFlight) {
            throw new HttpException("Flight not found", 404);
        }

        const updatedFlightData = {
            airline: flight.airline ? String(flight.airline) : existingFlight.airline,
            seats: flight.seats ? Number(flight.seats) : existingFlight.seats,
            flightNumber: flight.flightNumber ? String(flight.flightNumber) : existingFlight.flightNumber,
            origin: flight.origin ? String(flight.origin) : existingFlight.origin,
            destination: flight.destination ? String(flight.destination) : existingFlight.destination,
            departureTime: flight.departureTime ? String(flight.departureTime) : existingFlight.departureTime,
            arrivalTime: flight.arrivalTime ? String(flight.arrivalTime) : existingFlight.arrivalTime,
            remainingSeats: flight.seats ? Number(flight.seats) : existingFlight.remainingSeats,
            updatedAt: new Date().toISOString()
        }
        if(updatedFlightData.remainingSeats < 0){
            throw new HttpException("Invalid number of seats", 400);
        }

        const updateFlight = await db.update(flights).set(updatedFlightData).where(eq(flights.id, id))
        if (!updateFlight) {
            throw new HttpException("Failed to update flight", 500);
        }

        return { message: "Flight updated successfully", flight: updatedFlightData};
        
    }

    async deleteFlight(id: string){
        
        const [existingFlight]: FlightDto[] = await db.select().from(flights).where(eq(flights.id, id))
        if (!existingFlight) {
            throw new HttpException("Flight not found", 404);
        }

        const deleteFlight = await db.delete(flights).where(eq(flights.id, id))
        if (!deleteFlight) {
            throw new HttpException("Failed to delete flight", 500);
        }

        return { message: "Flight deleted successfully"};

    }
}