/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Logs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Logs" ALTER COLUMN "ip" DROP NOT NULL,
ALTER COLUMN "msg" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Logs_userId_key" ON "Logs"("userId");
