import React from "react";
import { useAuth } from "../../context/AuthContext";

const LogoutButton: React.FC = () => {
  const { logout, loading } = useAuth();
  return (
    <button
      className="btn btn-outline btn-error"
      onClick={() => logout()}
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
