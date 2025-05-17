"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppRouts from "@/Constant/Constant";
import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "@/Context/context";
import Button from "./Btn";

const Signin = () => {
  // Access user and token from AuthContext
  const { user, setUser, setToken, setSession } = useContext(AuthContext);
  // console.log("User:" , user);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      alert("Email and Password are required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(AppRouts.signin, { email, password });
      const userInfo = response.data.data.info;
      const token = response.data.data.token;
      console.log("token : ", token);
      console.log("User Signin:", userInfo);
      setUserDetails(userInfo);

      //****** Update sessionStorage & cookies to maintain tab session
      Cookies.set("token", token, { expires: 7 });
      sessionStorage.setItem("tokenForSessionStorage", token);
      
      setUser(userInfo);
      setSession(token);
      setToken(token);

      console.log(user);

      //  Navigate
      if (userInfo.role === "admin") {
        router.push("/AdminDashboard");
      } else if (userInfo.role === "employee") {
        router.push("/EmployeeDashboard");
      } else if (userInfo.role === "salesPerson") {
        // router.push("/EmployeeDashboard");
        router.push("/SalesPersonDashboard");
      } else if (userInfo.role === "developer") {
        router.push("/DeveloperDashBoard");
      } else if (userInfo.role === "graphicsDesigner") {
        router.push("/GraphicsDesignerDashBoard");
      } else {
        alert("Unauthorized role!");
        router.push("/");
      }
    } catch (error) {
      alert("ERROR: " + error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto py-4 px-6 ">
      <h2 className="text-white text-xl pt-10 md:text-4xl font-serif text-center ">
        Sign In
      </h2>

      <form
        className="space-y-6 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="w-full md:w-4/5">
          <label
            htmlFor="email"
            className="block text-white text-lg font-semibold font-serif"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="w-full md:w-4/5">
          <label
            htmlFor="password"
            className="block text-white text-lg font-semibold font-serif"
 
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
            placeholder="Enter your password"
            required
          />
          <div className="py-6">
        <Button title="Sign In" type="submit" loading={loading}></Button>
          </div>
          </div>
      </form>
    </div>
  );
};

export default Signin;
