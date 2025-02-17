import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/login/customer"); // Redirect to login page after logout
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">HDFC</h1>
      <button className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
