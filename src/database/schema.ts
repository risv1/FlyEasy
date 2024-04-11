import { boolean, date, integer, pgTable, text} from "drizzle-orm/pg-core";

export const flights = pgTable("flights", {
    id: text("id").primaryKey(),
    airline: text("airline").notNull(),
    seats: integer("seats").notNull(),
    flightNumber: text("flight_number").notNull(),
    origin: text("origin").notNull(),
    destination: text("destination").notNull(),
    departureTime: text("departure_time").notNull(),
    arrivalTime: text("arrival_time").notNull(),
    remainingSeats: integer("remaining_seats").notNull(),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
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

export const users = pgTable("users", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
});
