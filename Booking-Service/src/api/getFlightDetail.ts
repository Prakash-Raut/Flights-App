import { axiosInstance } from "../config/axiosInstance";

interface FlightDetailResponse {
	flightNumber: string;
	airplaneId: string;
	departureAirportId: string;
	arrivalAirportId: string;
	departureTime: string;
	arrivalTime: string;
	price: number;
	totalSeats: number;
	updatedAt: string;
	createdAt: string;
}

export async function getFlightDetail(
	flightId: string
): Promise<FlightDetailResponse | undefined> {
	try {
		const response = await axiosInstance.get(`/flights/${flightId}`);
		return response.data.data;
	} catch (error) {
		console.error("Cannot get flight detail", error);
	}
}
