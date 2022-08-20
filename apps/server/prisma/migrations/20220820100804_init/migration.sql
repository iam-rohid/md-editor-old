-- CreateTable
CREATE TABLE "FavoriteNotes" (
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "noteId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FavoriteNotes_pkey" PRIMARY KEY ("noteId","userId")
);

-- AddForeignKey
ALTER TABLE "FavoriteNotes" ADD CONSTRAINT "FavoriteNotes_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteNotes" ADD CONSTRAINT "FavoriteNotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
