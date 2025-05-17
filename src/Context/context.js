
'use client'

import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import AppRouts from "@/Constant/Constant";

// Create a context
export const AuthContext = createContext();

function AuthContextProvider({ children }) {
 
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token") || null); 
  const [session, setSession] = useState(null); 
  const [loading, setLoading] = useState(true); 
 
  // const [session, setSession] = useState(
  //   sessionStorage.getItem("tokenForSessionStorage") || null
  // ); // Initialize session storage token
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedSession = sessionStorage.getItem("tokenForSessionStorage") || null;
        setSession(storedSession);
      }
    }, []);
  


  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        await getUserInfo(session);
      } else if (!session && token) {
        sessionStorage.setItem("tokenForSessionStorage", token); 
        setSession(token); 
        await getUserInfo(token); 
      }
       else if (session && !token) {
        await getUserInfo(session);
      }
      
      else if (!session && !token) {
        setUser(null);
        setLoading(false);
      }
    };

    // if (session) {
      fetchUserData(); // Call fetchUserData only after session is set
    // }
  }, [token, session]); // Dependencies: token and session

  const getUserInfo = async (currentUserToken) => {
    try {
      setLoading(true);
      const response = await axios.get(AppRouts.getCurrentUserInfo, {
        headers: {
          Authorization: `Bearer ${currentUserToken}`,
        },
      });
      setUser(response.data.data); 
    } catch (err) {
      console.error("Error fetching user info: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, session, setSession, loading }}
    >    
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
