-- CreateTable
CREATE TABLE "Succulent" (
    "id" TEXT NOT NULL,
    "dexNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "difficulty" TEXT,
    "primaryType" TEXT NOT NULL,
    "secondaryType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Succulent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Succulent_dexNumber_key" ON "Succulent"("dexNumber");
