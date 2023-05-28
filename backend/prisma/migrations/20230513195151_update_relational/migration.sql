-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_times" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "abreviacao" TEXT NOT NULL,
    "escudo" TEXT,
    "userId" TEXT,
    "campeonatoId" TEXT,
    CONSTRAINT "times_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "campeonatos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_times" ("abreviacao", "escudo", "id", "nome", "userId") SELECT "abreviacao", "escudo", "id", "nome", "userId" FROM "times";
DROP TABLE "times";
ALTER TABLE "new_times" RENAME TO "times";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
