import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller()
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get('/flights')
  @UseGuards(AuthGuard)
  getFlights() {
    try {
      return this.flightsService.getFlights();
    } catch (error) {
      return { message: 'Failed to get flights' };
    }
  }

  @Get('/flights/:id')
  @UseGuards(AuthGuard)
  getFlightById(@Param('id') id) {
    try {
      return this.flightsService.getFlightById(id);
    } catch (error) {
      return { message: 'Failed to get flight' };
    }
  }
}
