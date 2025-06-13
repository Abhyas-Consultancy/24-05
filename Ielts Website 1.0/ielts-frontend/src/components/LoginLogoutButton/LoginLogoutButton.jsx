import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginLogoutButton = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {token ? (
        <button
          onClick={handleLogout}
          className="bg-brandRed text-white px-4 py-2 rounded shadow"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="bg-brandRed text-white px-4 py-2 rounded shadow"
        >
          Login
        </button>
      )}
    </>
  );
};

export default LoginLogoutButton;
