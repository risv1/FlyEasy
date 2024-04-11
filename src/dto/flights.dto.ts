import { z } from 'zod';

export const FlightSchema = z
  .object({
    id: z.string().length(36).optional(),
    airline: z.string(),
    seats: z.number(),
    flightNumber: z.string(),
    origin: z.string(),
    destination: z.string(),
    departureTime: z.string(),
    arrivalTime: z.string(),
    remainingSeats: z.number().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  });

export type FlightDto = z.infer<typeof FlightSchema>;
