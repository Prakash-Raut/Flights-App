-- DropForeignKey
ALTER TABLE `airport` DROP FOREIGN KEY `Airport_cityId_fkey`;

-- CreateTable
CREATE TABLE `Flight` (
    `id` VARCHAR(191) NOT NULL,
    `flightNumber` VARCHAR(191) NOT NULL,
    `airplaneId` VARCHAR(191) NOT NULL,
    `departureAirportId` VARCHAR(191) NOT NULL,
    `arrivalAirportId` VARCHAR(191) NOT NULL,
    `departureTime` DATETIME(3) NOT NULL,
    `arrivalTime` DATETIME(3) NOT NULL,
    `price` INTEGER NOT NULL,
    `boardingGate` VARCHAR(191) NOT NULL,
    `totalSeats` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Airport` ADD CONSTRAINT `Airport_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_airplaneId_fkey` FOREIGN KEY (`airplaneId`) REFERENCES `Airplane`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_departureAirportId_fkey` FOREIGN KEY (`departureAirportId`) REFERENCES `Airport`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_arrivalAirportId_fkey` FOREIGN KEY (`arrivalAirportId`) REFERENCES `Airport`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;
