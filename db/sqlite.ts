import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("seatgo.db");

export const initDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS trips (
      id INTEGER PRIMARY KEY NOT NULL,
      from_city TEXT,
      to_city TEXT,
      time TEXT,
      transport TEXT,
      price REAL,
      passengers INTEGER,
      driver_name TEXT,
      driver_image TEXT
    );
  `);
};