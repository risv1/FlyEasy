import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FlightsModule } from './api/flights/flights.module';
import { AdminModule } from './api/admin/admin.module';
import { BookingsModule } from './api/bookings/bookings.module';

@Module({
  imports: [
    AuthModule,
    AdminModule,
    FlightsModule,
    BookingsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
