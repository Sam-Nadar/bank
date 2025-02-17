import express from "express";
import { getAllCustomerAccounts, getCustomerTransactions } from "../controllers/bankerController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/accounts", authenticateUser, getAllCustomerAccounts);
router.get("/accounts/:userId/transactions", authenticateUser, getCustomerTransactions);

export default router;
