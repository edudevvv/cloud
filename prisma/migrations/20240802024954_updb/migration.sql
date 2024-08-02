/*
  Warnings:

  - You are about to drop the column `emailCode` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailCode";

-- CreateTable
CREATE TABLE "emailValidation" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "emailCode" TEXT NOT NULL,
    "emailExp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "emailValidation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emailValidation_email_key" ON "emailValidation"("email");

-- AddForeignKey
ALTER TABLE "emailValidation" ADD CONSTRAINT "emailValidation_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE SET NULL ON UPDATE CASCADE;
