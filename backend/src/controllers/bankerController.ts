import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const getAllCustomerAccounts = async (req: Request, res: Response): Promise<void> => {
  try {
    const accounts = await prisma.account.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true }, // Fetch customer details
        },
      },
    });

    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getCustomerTransactions = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
  
    try {
      //  Fetch account with user details
      const account = await prisma.account.findFirst({
        where: { userId: Number(userId) },
        include: { user: true }, //  Includes the user (customer) details
      });
  
      if (!account) {
        res.status(404).json({ error: "Account not found" });
        return;
      }
  
      //  Ensure transactions is always an array
      const transactions = (account.transactions as any) || [];
  
      //  Return transactions with customer name
      res.json({
        transactions,
        customerName: account.user.name, //  Now includes the customer's name
      });
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  };
  
