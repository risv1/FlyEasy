import { Module } from "@nestjs/common";
import { AdminFlightsController } from "./flights/admin.controller.flights";
import { AdminFlightsService } from "./flights/admin.service.flights";

@Module({
    imports: [],
    controllers: [AdminFlightsController],
    providers: [AdminFlightsService],
})

export class AdminModule {}