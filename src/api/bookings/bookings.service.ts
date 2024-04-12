import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as jwt from 'jsonwebtoken';
import { db } from 'src/database/db';
import { bookings, flights } from 'src/database/schema';
import { eq } from 'drizzle-orm';
import { FlightDto } from 'src/dto/flights.dto';

@Injectable()
export class BookingsService {
  async createBooking(request: any, flightId: any) {
    const token = request.cookies.token;
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const user: any = await jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    const [selectedFlight]: FlightDto[] = await db
      .select()
      .from(flights)
      .where(eq(flights.id, flightId));
    if (!selectedFlight) {
      throw new HttpException('Flight not found', 404);
    }
    if (selectedFlight.remainingSeats <= 0) {
      throw new HttpException('No available seats', 400);
    }
    if (selectedFlight.departureTime < new Date().toISOString()) {
      throw new HttpException('Flight has already departed', 400);
    }

    const bookingData = {
      id: String(uuid()),
      passengerId: String(user.id),
      passengerName: String(user.name),
      passengerEmail: String(user.email),
      status: String('CONFIRMED'),
      createdAt: String(new Date().toISOString()),
      updatedAt: String(new Date().toISOString()),
    };
    if (!bookingData) {
      throw new HttpException('Failed to create booking', 500);
    }

    const updatedFlight = await db
      .update(flights)
      .set({ remainingSeats: selectedFlight.remainingSeats - 1 })
      .where(eq(flights.id, flightId));
    if (!updatedFlight) {
      throw new HttpException('Failed to create booking', 500);
    }

    const newBooking = await db.insert(bookings).values(bookingData);
    if (!newBooking) {
      throw new HttpException('Failed to create booking', 500);
    }

    return { message: 'Booking created successfully' };
  }

  async getBookings(request: any) {
    const token = request.cookies.token;
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const user: any = await jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    const userBookings = await db
      .select()
      .from(bookings)
      .where(eq(bookings.passengerId, user.id));
    if (!userBookings) {
      throw new HttpException('Failed to get bookings', 500);
    }

    return userBookings;
  }
}
