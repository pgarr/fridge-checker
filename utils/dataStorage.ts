import { type SQLiteDatabase } from "expo-sqlite";
import { type FridgeItem } from "@/utils/types";

const DATABASE_VERSION = 1;

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
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};

export const getAllItems = async (db: SQLiteDatabase) => {
  return db.getAllAsync<FridgeItem>("SELECT * FROM content");
};

export const addItem = async (
  db: SQLiteDatabase,
  name: string,
  date: string
) => {
  return db.runAsync("INSERT INTO content (name, date) VALUES (?, ?)", [
    name,
    date,
  ]);
};

export const deleteItem = async (db: SQLiteDatabase, id: number) => {
  return db.runAsync("DELETE FROM content WHERE id = ?", [id]);
};
