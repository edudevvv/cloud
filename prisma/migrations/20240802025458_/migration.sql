/*
  Warnings:

  - You are about to drop the column `email` on the `emailValidation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `emailValidation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "emailValidation" DROP CONSTRAINT "emailValidation_email_fkey";

-- DropIndex
DROP INDEX "emailValidation_email_key";

-- AlterTable
ALTER TABLE "emailValidation" DROP COLUMN "email",
ADD COLUMN     "userEmail" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "emailValidation_userEmail_key" ON "emailValidation"("userEmail");

-- AddForeignKey
ALTER TABLE "emailValidation" ADD CONSTRAINT "emailValidation_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE SET NULL ON UPDATE CASCADE;
