import express, { Application } from "express";
import dotenv from "dotenv";
import restaurantsRouter from "./src/routes/restaurantsRoutes";
import dishesRouter from "./src/routes/dishesRoutes";

import { PrismaClient } from "@prisma/client";

// Load environment variables from .env file
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mount routes
app.use("/restaurants", restaurantsRouter);
app.use("/restaurants/:id/dishes", dishesRouter);


const prisma = new PrismaClient();

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit();
});
