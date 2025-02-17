import axios from "axios";

export const api = axios.create({
  baseURL: "https://bank-jwcl.onrender.com/api",
});

export const registerUser = async (name: string, email: string, password: string) => {
  return api.post("/auth/register", { name, email, password });
};

export const loginUser = async (email: string, password: string, role: "customer" | "banker") => {
  return api.post("/auth/login", { email, password, role });
};

export const getTransactions = async () => {
  return api.get("/transactions/transactions", { headers: authHeader() });
};

export const getCustomerAccounts = async () => {
  return api.get("/banker/accounts", { headers: authHeader() });
};

export const getCustomerTransactions = async (userId: number) => {
  return api.get(`/banker/accounts/${userId}/transactions`, { headers: authHeader() });
};

export const depositMoney = async (amount: number) => {
  return api.post("/transactions/deposit", { amount }, { headers: authHeader() });
};

export const withdrawMoney = async (amount: number) => {
  return api.post("/transactions/withdraw", { amount }, { headers: authHeader() });
};



const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
