# MyFlights Microservices

Welcome to the MyFlights project! This project is composed of four microservices: Auth, Booking, Flight, and Notification. Each microservice is designed to handle specific functionalities within the MyFlights ecosystem.

## Table of Contents

- [Auth Service](#auth-service)
- [Booking Service](#booking-service)
- [Flight Service](#flight-service)
- [Notification Service](#notification-service)
- [Contributing](#contributing)
- [License](#license)

## Auth Service

The Auth Service is responsible for user authentication and authorization. It handles user registration, login, and token management.

### Features

- User registration
- User login
- JWT token generation and validation
- Password encryption

### Endpoints

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login a user
- `GET /auth/validate` - Validate a JWT token

## Booking Service

The Booking Service manages flight bookings. It allows users to create, view, and cancel bookings.

- `POST /booking` - Create a new booking
- `GET /booking/:id` - Get booking details by ID
- `DELETE /booking/:id` - Cancel a booking by ID

## Flight Service

The Flight Service provides information about available flights. It allows users to search for flights and view flight details.

- `GET /flights` - Search for flights
- `GET /flights/:id` - Get flight details by ID

## Notification Service

The Notification Service handles sending notifications to users. It supports email and SMS notifications.

- `POST /notifications/email` - Send an email notification
- `POST /notifications/sms` - Send an SMS notification

## Contributing

We welcome contributions to the MyFlights project! Please read our [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
