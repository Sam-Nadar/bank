import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // ✅ Ensure all fields exist
    if (!name || !email || !password) {
      res.status(400).json({ error: "All fields (name, email, password) are required" });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }

    // ✅ Ensure password is a string
    if (typeof password !== "string") {
      res.status(400).json({ error: "Invalid password format" });
      return;
    }

    // ✅ Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // ✅ Create User with Associated Account
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "customer",
        accounts: {
          create: { balance: 0.00 }, // ✅ Automatically create an account with 0 balance
        },
      },
      include: { accounts: true }, // Include account details in response
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        balance: user.accounts[0].balance, //  Return account balance
      },
    });
  } catch (err) {
    console.error("Error in register:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role } = req.body; //  Role is required in login

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    if (role === "banker" && user.role == "customer") {
        const updateUser = await prisma.user.update({
            where: {
              email,
            },
            data: {
              role: 'banker',
            },
          })
        res.status(403).json({ error: "Unauthorized: Your account is not approved as a banker" });
        return;
      }

   
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "72h" }
    );

    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
