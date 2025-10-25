/*
  Warnings:

  - The values [PLANNER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `images` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `plannerId` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `hostId` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('HOST', 'TRAVELER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'TRAVELER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_plannerId_fkey";

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "images",
DROP COLUMN "plannerId",
ADD COLUMN     "bannerImage" TEXT,
ADD COLUMN     "gallery" TEXT[],
ADD COLUMN     "hostId" INTEGER NOT NULL,
ADD COLUMN     "itinerary" JSONB;

-- CreateTable
CREATE TABLE "HostVerification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "isCompany" BOOLEAN NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "travelBrand" TEXT NOT NULL,
    "about" TEXT,
    "website" TEXT,
    "socialLinks" TEXT,
    "registrationId" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HostVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HostVerification_userId_key" ON "HostVerification"("userId");

-- AddForeignKey
ALTER TABLE "HostVerification" ADD CONSTRAINT "HostVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
