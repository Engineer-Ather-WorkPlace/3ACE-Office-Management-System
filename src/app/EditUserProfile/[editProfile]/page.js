// cmponent to change password
'use client'

import EmployeeNavbar from "@/app/Components/EmployeNavebar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AppRouts from "@/Constant/Constant";
import { useContext } from "react";
import { AuthContext } from "@/Context/context";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/app/Components/Btn";

const EditUserProfile = () => {

    const router = useRouter()
    const { user } = useContext(AuthContext)

    // console.log("user ID :", user._id);
    // const objID = uid.params.editProfile;
    
    const objID =  user?._id
    console.log("userID : ", objID);

    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    //function to check password strength
    const getPasswordStrength = (pwd) => {
        if (pwd.length < 6) return "Weak";
        if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.length >= 8) return "Strong";
        return "Medium";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const password = e.target.password.value
        const confirmPassword = e.target.confirmPassword.value

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const updates = {
            password: e.target.password.value,
        };

        setLoading(true);

        try {
            const response = await axios.put(AppRouts.editUserProfile + "/" + objID, updates);
            console.log("Updated response:", response?.data || "No data returned");
            router.replace("/");
            // e.target.reset();     // Reset the form
        } catch (error) {
            console.error("Error updating user profile", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" bg-gradient-to-r from-gray-900 to-blue-900">
            {/* navebar */}
            <nav className=" z-10">
                <EmployeeNavbar />
            </nav>

            <div className=" min-h-screen flex flex-col justify-evenly ">
                {/* Page Header */}
                <div className=" pb-4 px-6 text-center ">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide">
                        3ACE Technology
                    </h1>
                    <p className="text-lg md:text-xl text-blue-200 mt-2 font-medium">
                        Change Your Password Securely
                    </p>
                </div>

                {/* main content  */}
                <div className="flex justify-center  py-12 px-6 sm:px-10 lg:px-20">

                    {/* Left Side: Change Password Form */}
                    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 w-full md:w-2/3 shadow-lg">
                        <h2 className="text-2xl font-bold text-white mb-6">Update Password</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-10" >

                            {/* Password Field */}
                            <div className="relative">
                                <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                                    New Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordStrength(getPasswordStrength(e.target.value));
                                    }}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-10"
                                    placeholder="********"
                                    required
                                />
                                <div
                                    className="absolute top-9 right-3 cursor-pointer text-gray-600"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? <Eye /> : <EyeOff />}
                                </div>
                                <p
                                    className={`mt-2 text-sm font-semibold ${passwordStrength === "Weak"
                                        ? "text-red-400"
                                        : passwordStrength === "Medium"
                                            ? "text-yellow-400"
                                            : "text-green-400"
                                        }`}
                                >
                                    {password && `Strength: ${passwordStrength}`}
                                </p>
                            </div>

                        {/* Confirm Password Field */}
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-white text-sm font-medium mb-2">
                                Confirm Password
                            </label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 pr-10"
                                placeholder="******"
                                required
                            />
                            <div
                                className="absolute top-9 right-3 cursor-pointer text-gray-600"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                            >
                                {showConfirmPassword ? <Eye /> : <EyeOff />}
                            </div>
                           
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                        <Button
                            title='Sign In'
                            type="submit"
                            loading={loading}
                            >
                            </Button>
                          
                        </div>
                    </form>
                </div>

                </div>
            </div>
        </div>

    );
};

export default EditUserProfile;
