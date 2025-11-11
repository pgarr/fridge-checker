import { type SQLiteDatabase } from "expo-sqlite";
import { type FridgeItem } from "@/utils/types";

const DATABASE_VERSION = 2;

type FridgeItemDb = {
  id: number;
  name: string;
  date: string; // ISO string
  notificationId?: string;
};

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  const meta = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");
  if (meta && meta.user_version >= DATABASE_VERSION) {
    return;
  }
  if (!meta || meta.user_version === 0) {
    await db.execAsync(`
  PRAGMA journal_mode = 'wal';
  CREATE TABLE content (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, date TEXT NOT NULL);
  `);
  }
  if (!meta || meta.user_version <= 1) {
    await db.execAsync(`
      ALTER TABLE content ADD COLUMN notificationId TEXT;
    `);
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};

export const getAllItems = async (
  db: SQLiteDatabase
): Promise<FridgeItem[]> => {
  const data = await db.getAllAsync<FridgeItemDb>("SELECT * FROM content");
  return data.map((item) => {
    return {
      ...item,
      date: new Date(item.date),
    };
  });
};

export const addItem = async (
  db: SQLiteDatabase,
  item: { name: string; date: string; notificationId: string }
) => {
  return db.runAsync(
    "INSERT INTO content (name, date, notificationId) VALUES (?, ?, ?)",
    [item.name, item.date, item.notificationId]
  );
};

export const deleteItems = async (db: SQLiteDatabase, ids: number[]) => {
  const placeholders = ids.map(() => "?").join(", ");
  return db.runAsync(`DELETE FROM content WHERE id IN (${placeholders})`, ids);
};
