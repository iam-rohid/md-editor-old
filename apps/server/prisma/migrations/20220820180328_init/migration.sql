-- CreateTable
CREATE TABLE "PinnedNotes" (
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "noteId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PinnedNotes_pkey" PRIMARY KEY ("noteId","userId")
);

-- AddForeignKey
ALTER TABLE "PinnedNotes" ADD CONSTRAINT "PinnedNotes_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PinnedNotes" ADD CONSTRAINT "PinnedNotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
