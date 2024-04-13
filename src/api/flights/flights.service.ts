import { HttpException, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/database/db';
import { flights } from 'src/database/schema';

@Injectable()
export class FlightsService {
  async getFlights() {
    const allflights = await db.select().from(flights);
    if (!allflights) {
      throw new HttpException('Failed to get flights', 500);
    }

    if (allflights.length === 0) {
      throw new HttpException('No flights found', 404);
    }

    return { message: 'Flights found', flights: allflights };
  }

  async getFlightById(id: string) {
    const [flight] = await db.select().from(flights).where(eq(flights.id, id));
    if (!flight) {
      throw new HttpException('Flight not found', 404);
    }

    return { message: 'Flight found', flight: flight };
  }
}
