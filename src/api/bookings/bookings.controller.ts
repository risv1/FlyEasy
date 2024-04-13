import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('/bookings')
  @UseGuards(AuthGuard)
  async createBooking(@Req() request: any, @Query() query: any) {
    try {
      return this.bookingsService.createBooking(request, query.flightId);
    } catch (error) {
      return { message: 'Failed to create booking' };
    }
  }

  @Get('/bookings')
  @UseGuards(AuthGuard)
  async getBookings(@Req() request: any) {
    try {
      return this.bookingsService.getBookings(request);
    } catch (error) {
      return { message: 'Failed to get bookings' };
    }
  }
}
