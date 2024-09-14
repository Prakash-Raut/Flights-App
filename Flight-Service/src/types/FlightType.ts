export interface FlightCreateInput {
	flightNumber: string;
	airplaneId: string;
	departureAirportId: string;
	arrivalAirportId: string;
	departureTime: Date;
	arrivalTime: Date;
	price: number;
	boardingGate: string;
	totalSeats: number;
}

export interface FlightUpdateInput {
	flightNumber: string;
	airplaneId: string;
	departureAirportId: string;
	arrivalAirportId: string;
	departureTime: Date;
	arrivalTime: Date;
	price: number;
	boardingGate: string;
	totalSeats: number;
}


