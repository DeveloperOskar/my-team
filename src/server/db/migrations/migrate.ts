import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, conn } from "../index";
// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: "src/server/db/migrations" });
// Don't forget to close the connection, otherwise the script will hang
await conn.end();
