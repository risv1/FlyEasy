import { z } from "zod";

export const FlightSchema = z.object({
    id: z.string().length(36),
    airline: z.string(),
    seats: z.number(),
    flightNumber: z.string(),
    origin: z.string(),
    destination: z.string(),
    departureTime: z.string(),
    arrivalTime: z.string(),
    remainingSeats: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type FlightDto = z.infer<typeof FlightSchema>;