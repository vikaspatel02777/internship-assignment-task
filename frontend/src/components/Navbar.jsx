import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      background: "#1e1e1e",
      color: "white"
    }}>
      <h2>Task Manager</h2>
      <button 
        onClick={handleLogout}
        style={{
          padding: "8px 16px",
          background: "#ff4d4f",
          border: "none",
          color: "white",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
