-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3),
    "language" TEXT NOT NULL,
    "findUs" TEXT NOT NULL,
    "newsletter" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
