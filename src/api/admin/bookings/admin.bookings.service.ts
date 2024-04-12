import { HttpException, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { db } from "src/database/db";
import { bookings } from "src/database/schema";
import { BookingDto } from "src/dto/bookings.dto";

@Injectable()
export class AdminBookingService {

    async getBookings() {
        const allBookings: BookingDto[] = await db.select().from(bookings);
        if(!allBookings) {
            throw new HttpException('No bookings found', 404);
        }

        if(allBookings.length === 0) {
            throw new HttpException('No bookings found', 404);
        }

        return { message: 'Bookings found', bookings: allBookings };
    }

    async getBookingById(bookingId: string) {
        const [booking]: BookingDto[] = await db.select().from(bookings).where(eq(bookings.id, bookingId))
        if(!booking) {
            throw new HttpException('Booking not found', 404);
        }

        return { message: 'Booking found', booking };
    }
    
    async updateBooking(bookingId: string, booking: any) {
        const [bookingExists]: BookingDto[] = await db.select().from(bookings).where(eq(bookings.id, bookingId));
        if(!bookingExists) {
            throw new HttpException('Booking not found', 404);
        }

        const updatedBookingData = {
            flightId: booking.flightId ? String(booking.flightId) : bookingExists.flightId,
            passengerId: booking.userId ? String(booking.passengerId) : bookingExists.passengerId,
            passengerName: booking.passengerName ? String(booking.passengerName) : bookingExists.passengerName,
            passengerEmail: booking.passengerEmail ? String(booking.passengerEmail) : bookingExists.passengerEmail,
            status: booking.status ? String(booking.status) : bookingExists.status,
            updatedAt: new Date().toISOString()
        }

        const updatedBooking = await db.update(bookings).set(updatedBookingData).where(eq(bookings.id, bookingId));
        if(!updatedBooking) {
            throw new HttpException('Failed to update booking', 500);
        }

        return { message: 'Booking updated successfully', booking: updatedBooking };
    }

    async deleteBooking(bookingId: string) {
        const [bookingExists]: BookingDto[] = await db.select().from(bookings).where(eq(bookings.id, bookingId));
        console.log(bookingExists);
        if(!bookingExists) {
            throw new HttpException('Booking not found', 404);
        }

        const deletedBooking = await db.delete(bookings).where(eq(bookings.id, bookingId));
        if(!deletedBooking) {
            throw new HttpException('Failed to delete booking', 500);
        }

        return { message: 'Booking deleted successfully' };
    }

}