import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AdminFlightsService } from "./admin.service.flights";
import { FlightDto } from "src/dto/flights.dto";
import { AdminGuard } from "src/guards/admin.guard";

@Controller("/admin")
export class AdminFlightsController {
    constructor(private readonly adminFlightsService: AdminFlightsService) {}   

    @Post("/flights")
    @UseGuards(AdminGuard)
    createFlight(@Body() flight: FlightDto){
        try{
        return this.adminFlightsService.createFlight(flight);
        } catch (error) {
            return { message: "Failed to create flight" };
        }
    }

    @Patch("/flights/:id")
    @UseGuards(AdminGuard)
    updateFlight(@Body() flight: FlightDto, @Param('id') id: string){
        try{
        return this.adminFlightsService.updateFlight(flight, id);
        } catch (error) {
            return { message: "Failed to update flight" };
        }
    }

    @Delete("/flights/:id")
    @UseGuards(AdminGuard)
    deleteFlight(@Param('id') id: string){
        try{
        return this.adminFlightsService.deleteFlight(id);
        } catch (error) {
            return { message: "Failed to delete flight" };
        }
    }
}