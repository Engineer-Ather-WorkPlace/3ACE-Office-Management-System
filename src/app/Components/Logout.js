'use client';
import React, { useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Context/context";

const LogoutButton = () => {
  const { setUser, setToken, setSession } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    console.log("Logging out...");

    // Clear authentication state
    setUser(null);
    // setToken(null);
    // setSession(null);

    // Remove authentication tokens
    Cookies.remove("token");
    sessionStorage.clear();
    localStorage.clear();

    window.location = "/";    //Redirect forcefully to the main landing screen
    // router.replace("/")
   
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full px-2 py-1 rounded-lg hover:border hover:bg-gradient-to-r from-gray-800 to-blue-800 hover:text-white transition duration-100"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
