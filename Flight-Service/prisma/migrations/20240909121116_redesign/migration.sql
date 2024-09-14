-- DropForeignKey
ALTER TABLE `flight` DROP FOREIGN KEY `Flight_arrivalAirportId_fkey`;

-- DropForeignKey
ALTER TABLE `flight` DROP FOREIGN KEY `Flight_departureAirportId_fkey`;

-- AddForeignKey
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_departureAirportId_fkey` FOREIGN KEY (`departureAirportId`) REFERENCES `Airport`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_arrivalAirportId_fkey` FOREIGN KEY (`arrivalAirportId`) REFERENCES `Airport`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
