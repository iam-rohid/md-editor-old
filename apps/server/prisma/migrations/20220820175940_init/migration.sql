-- DropForeignKey
ALTER TABLE "FavoriteNotes" DROP CONSTRAINT "FavoriteNotes_noteId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteNotes" DROP CONSTRAINT "FavoriteNotes_userId_fkey";

-- AddForeignKey
ALTER TABLE "FavoriteNotes" ADD CONSTRAINT "FavoriteNotes_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteNotes" ADD CONSTRAINT "FavoriteNotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
