import { boolean, date, integer, pgTable, text} from "drizzle-orm/pg-core";


export const flights = pgTable("flights", {
    id: text("id").primaryKey(),
    origin: text("origin").notNull(),
    destination: text("destination").notNull(),
    departureDate: date("departure_date").notNull(),
    arrivalDate: date("arrival_date").notNull(),
    numberOfPassengers: integer("number_of_passengers").notNull(),
});

export const bookings = pgTable("bookings", {
    id: text("id").primaryKey(),
    flightId: text("flight_id").references(()=>flights.id),
    passengerName: text("passenger_name").notNull(),
    passengerEmail: text("passenger_email").notNull(),
    status: text("status").notNull(),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
});

export const passengers = pgTable("passengers", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
});

export const seats = pgTable("seats", {
    id: text("id").primaryKey(),
    flightId: text("flight_id").references(()=>flights.id),
    seatNumber: text("seat_number").notNull(),
    isReserved: boolean("is_reserved").notNull(),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
});
