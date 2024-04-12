import { Controller, Delete, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { AdminBookingService } from "./admin.bookings.service";
import { AdminGuard } from "src/guards/admin.guard";

@Controller("/admin")
export class AdminBookingsController {
 
    constructor(private readonly adminBookingService: AdminBookingService) {}
    
    @Get("/bookings")
    @UseGuards(AdminGuard)
    getBookings(){
        try{
        return this.adminBookingService.getBookings();
        } catch (error) {
            return { message: "Failed to get bookings" };
        }
    }

    @Get("/bookings/:id")
    @UseGuards(AdminGuard)
    getBookingById(@Param('id') bookingId: string){
        try{
        return this.adminBookingService.getBookingById(bookingId);
        } catch (error) {
            return { message: "Failed to get booking" };
        }
    }
    
    @Patch("/bookings/:id")
    @UseGuards(AdminGuard)
    updateBooking(@Param('id') bookingId: string, booking: any){
        try{
        return this.adminBookingService.updateBooking(bookingId, booking);
        } catch (error) {
            return { message: "Failed to update booking" };
        }
    }

    @Delete("/bookings/:id")
    @UseGuards(AdminGuard)
    deleteBooking(@Param('id') bookingId: string){
        try{
        return this.adminBookingService.deleteBooking(bookingId);
        } catch (error) {
            return { message: "Failed to delete booking" };
        }
    }

}