import { z } from 'zod';

export const BookingSchema = z.object({
  id: z.string().length(36),
  flightId: z.string().length(36),
  passengerName: z.string(),
  passengerEmail: z.string().email(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type BookingDto = z.infer<typeof BookingSchema>;