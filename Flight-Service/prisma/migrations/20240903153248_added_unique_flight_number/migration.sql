/*
  Warnings:

  - A unique constraint covering the columns `[flightNumber]` on the table `Flight` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `airport` DROP FOREIGN KEY `Airport_cityId_fkey`;

-- AlterTable
ALTER TABLE `airplane` MODIFY `capacity` INTEGER NOT NULL DEFAULT 200;

-- CreateTable
CREATE TABLE `Seat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `airplaneId` VARCHAR(191) NOT NULL,
    `row` INTEGER NOT NULL,
    `col` VARCHAR(191) NOT NULL,
    `type` ENUM('BUSINESS', 'ECONOMY', 'PREMIUM_ECONOMY', 'FIRST_CLASS') NOT NULL DEFAULT 'ECONOMY',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Flight_flightNumber_key` ON `Flight`(`flightNumber`);

-- AddForeignKey
ALTER TABLE `Airport` ADD CONSTRAINT `Airport_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_airplaneId_fkey` FOREIGN KEY (`airplaneId`) REFERENCES `Airplane`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
