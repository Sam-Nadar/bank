import express from "express";
import { getTransactions, deposit, withdraw } from "../controllers/transactionController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/transactions", authenticateUser, getTransactions);
router.post("/deposit", authenticateUser, deposit);
router.post("/withdraw", authenticateUser, withdraw);

export default router;
