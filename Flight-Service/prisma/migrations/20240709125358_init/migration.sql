-- CreateTable
CREATE TABLE `Airport` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `cityId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Airport_name_key`(`name`),
    UNIQUE INDEX `Airport_code_key`(`code`),
    UNIQUE INDEX `Airport_address_key`(`address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Airport` ADD CONSTRAINT `Airport_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
