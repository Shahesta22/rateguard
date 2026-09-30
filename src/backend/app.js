import express from "express";
import cors from "cors";
import helmet from "helmet";


import healthRoutes from "./routes/health.routes.js";
import apiRoutes from "./routes/api.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import { rateGuard } from "./middleware/rateGuard.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api", rateGuard, apiRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

export default app;
