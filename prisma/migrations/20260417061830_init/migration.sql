/*
  Warnings:

  - You are about to drop the column `Completed` on the `Task` table. All the data in the column will be lost.
  - Made the column `title` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "Completed",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "title" SET NOT NULL;
