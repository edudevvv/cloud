/*
  Warnings:

  - You are about to drop the `emailValidation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "emailValidation" DROP CONSTRAINT "emailValidation_userEmail_fkey";

-- DropTable
DROP TABLE "emailValidation";

-- CreateTable
CREATE TABLE "Validators" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT,
    "emailCode" TEXT NOT NULL,
    "emailExp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Validators_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Validators_userEmail_key" ON "Validators"("userEmail");

-- AddForeignKey
ALTER TABLE "Validators" ADD CONSTRAINT "Validators_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE SET NULL ON UPDATE CASCADE;
