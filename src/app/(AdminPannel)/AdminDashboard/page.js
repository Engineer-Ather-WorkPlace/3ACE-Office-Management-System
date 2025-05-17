"use client";

import React from "react";
// import AdminHerosection from "../AdminComponent/Projects";
import Projects from "../AdminComponent/Projects";
import AddNewProject from "@/app/Components/AddNewProject";
import { useContext } from "react";
import { AuthContext } from "@/Context/context";

export default function AdminDashboard() {

 // Access user and token from AuthContext
 const { user } = useContext(AuthContext);
 console.log("User:" , user);

  // Dummy data for demonstration
  // const totalEmployees = 50;
  // const pendingProjects = 12;
  // const totalSales = 120000;

  return (
    <div className="min-h-screen text-text m-4">

       {/* Main Content */}
      <div className=" py-3 mx-auto bg-white shadow-md rounded-lg">
        {/* Header Section */}
        <div className="w-full flex flex-col lg:flex-row gap-10 shadow-md items-center underline decoration-heading p-4 mb-6">
          <h2 className="text-md md:text-4xl font-serif text-heading">Project Details</h2>
          
          <AddNewProject />
        </div>
  
        {/* Projects List */}
        <Projects />
      </div>
    </div>
)}