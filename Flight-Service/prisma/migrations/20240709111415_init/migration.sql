-- CreateTable
CREATE TABLE `Airplane` (
    `id` VARCHAR(191) NOT NULL,
    `modelNumber` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
