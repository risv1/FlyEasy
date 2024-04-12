import { Body, Controller, Delete, Param, Patch, Post, UseGuards, UsePipes } from "@nestjs/common";
import { AdminFlightsService } from "./admin.flights.service";
import { FlightDto, FlightSchema } from "src/dto/flights.dto";
import { AdminGuard } from "src/guards/admin.guard";
import { ZodValidationPipe } from "src/pipes/zod";

@Controller("/admin")
export class AdminFlightsController {
    constructor(private readonly adminFlightsService: AdminFlightsService) {}   

    @Post("/flights")
    @UseGuards(AdminGuard)
    @UsePipes(new ZodValidationPipe(FlightSchema))
    createFlight(@Body() flight: FlightDto){
        try{
        return this.adminFlightsService.createFlight(flight);
        } catch (error) {
            return { message: "Failed to create flight" };
        }
    }

    @Patch("/flights/:id")
    @UseGuards(AdminGuard)
    @UsePipes(new ZodValidationPipe(FlightSchema))
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