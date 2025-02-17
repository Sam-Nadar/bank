import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import bankerRoutes from "./routes/bankerRoutes"; //  Import banker routes

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/banker", bankerRoutes); //  Add banker routes

export default app;
