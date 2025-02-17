import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const BankerLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(""); // Reset error message
  
      try {
        const response = await loginUser(email, password, "banker");
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          navigate("/accounts");
        }
      } catch (err: any) {
        setError(err.response?.data?.error || "Login failed. Try again.");
      }
    };
  
    return (
      <div className="flex justify-center items-center h-screen">
        <form className="w-80 p-6 bg-white shadow-md rounded" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Banker Login</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <input className="border p-2 w-full my-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="border p-2 w-full my-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="bg-purple-500 text-white p-2 rounded w-full">Login</button>
        </form>
      </div>
    );
  };
  
  export default BankerLogin;
  