import { db } from "@/db/sqlite";

export const saveTrips = async (trips: any[]) => {
  for (const t of trips) {
    await db.runAsync(
      `INSERT OR REPLACE INTO trips 
      (id, from_city, to_city, time, transport, price, passengers, driver_name, driver_image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        t.id,
        t.from_city,
        t.to_city,
        t.time,
        t.transport,
        t.price,
        t.passengers,
        t.driver_name,
        t.driver_image,
      ],
    );
  }
};

export const getLocalTrips = async () => {
  return await db.getAllAsync(`SELECT * FROM trips`);
};
