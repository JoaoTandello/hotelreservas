-- CreateTable
CREATE TABLE `Quartos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospede` VARCHAR(191) NOT NULL,
    `data_entrada` VARCHAR(191) NOT NULL,
    `data_saida` VARCHAR(191) NOT NULL,
    `quarto_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
