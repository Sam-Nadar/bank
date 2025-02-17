import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

//  Get all transactions (Stored in JSON format)
export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const account = await prisma.account.findFirst({
      where: { userId: (req as any).user.id },
    });

    console.log((req as any).user.id);

    if (!account) {
      res.status(404).json({ error: "Account not found" });
      return;
    }

    //  Ensure transactions is always an array
    const transactions = (account.transactions as any) || [];

    //  Return both transactions & balance
    res.json({
      transactions,
      balance: account.balance, //  Now includes balance
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};


//  Deposit Money
export const deposit = async (req: Request, res: Response): Promise<void> => {
  const { amount } = req.body;

  try {
    const account = await prisma.account.findFirst({
      where: { userId: (req as any).user.id },
    });

    if (!account) {
      res.status(404).json({ error: "Account not found" });
      return;
    }

    //  Ensure transactions is an array
    const transactions: any[] = (account.transactions as any) || [];

    //  Create a new transaction record
    const newTransaction = {
      type: "CREDIT",
      amount,
      date: new Date().toISOString(),
      description: "Deposited into account",
    };

    transactions.push(newTransaction);

    //  Update balance and transactions JSON
    const updatedAccount = await prisma.account.update({
      where: { id: account.id },
      data: {
        balance: { increment: amount },
        transactions, //  Directly store JSON object instead of string
      },
    });

    res.json({ message: "Deposit successful", balance: updatedAccount.balance, transactions });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

//  Withdraw Money
export const withdraw = async (req: Request, res: Response): Promise<void> => {
  const { amount } = req.body;

  try {
    const account = await prisma.account.findFirst({
      where: { userId: (req as any).user.id },
    });

    if (!account) {
      res.status(404).json({ error: "Account not found" });
      return;
    }

    if (account.balance < amount) {
      res.status(400).json({ error: "Insufficient funds" });
      return;
    }

    //  Ensure transactions is an array
    const transactions: any[] = (account.transactions as any) || [];

    //  Create a new transaction record
    const newTransaction = {
      type: "DEBIT",
      amount,
      date: new Date().toISOString(),
      description: "Withdrawn from account",
    };

    transactions.push(newTransaction);

    //  Update balance and transactions JSON
    const updatedAccount = await prisma.account.update({
      where: { id: account.id },
      data: {
        balance: { decrement: amount },
        transactions, //  Directly store JSON object instead of string
      },
    });

    res.json({ message: "Withdrawal successful", balance: updatedAccount.balance, transactions });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
