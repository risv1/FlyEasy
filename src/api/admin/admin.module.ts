import { Module } from '@nestjs/common';
import { AdminFlightsController } from './flights/admin.flights.controller';
import { AdminFlightsService } from './flights/admin.flights.service';
import { AdminBookingsController } from './bookings/admin.bookings.controller';
import { AdminBookingService } from './bookings/admin.bookings.service';
import { AdminUserController } from './users/admin.users.controller';
import { AdminUserService } from './users/admin.users.service';

@Module({
  imports: [],
  controllers: [
    AdminFlightsController,
    AdminBookingsController,
    AdminUserController,
  ],
  providers: [AdminFlightsService, AdminBookingService, AdminUserService],
})
export class AdminModule {}
