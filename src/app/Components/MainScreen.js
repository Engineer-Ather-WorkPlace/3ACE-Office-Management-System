"use client";

import Image from "next/image";
import { Suspense } from "react";
import Signin from "./signin";
import ServicesPage from "./Services";
import { Activity, BarChart3, Users, Briefcase } from "lucide-react";
import RoleBasedNavigation from "./RoleBaseNavigation";
import LOGO from "@/images/LOGO.jpeg";
import ServiceBanner from "@/images/ServiceBanner.avif"

export default function MainScreen() {
  const recentActivity = [
    {
      ueryFrom: "Ali",
      employeeId: "ID : 3ACE-TECH-E10",
      activity: "New sales lead added",
    },
    {
      ueryFrom: "Abid",
      employeeId: "ID : 3ACE-TECH-E11",
      activity: "New sales lead added",
    },
    {
      ueryFrom: "Asgher",
      employeeId: "ID : 3ACE-TECH-E16",
      activity: "New sales lead added",
    },
    {
      ueryFrom: "Ali",
      employeeId: "ID : 3ACE-TECH-E10",
      activity: "New sales lead added",
    },
    {
      ueryFrom: "Abid",
      employeeId: "ID : 3ACE-TECH-E11",
      activity: "New sales lead added",
    },
    {
      ueryFrom: "Asgher",
      employeeId: "ID : 3ACE-TECH-E16",
      activity: "New sales lead added",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with Banner and Sign-in */}
      <section className="relative">
        <div className="w-full min-h-screen relative  bg-gradient-to-r from-gray-800  to-blue-800">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8">
              <div className="text-white space-y-4 ">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3  py-1 rounded-full text-sm">
                  <Image
                    src={LOGO}
                    alt="Logo"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <span>Enterprise Solution</span>
                </div>
                <h1 className="text-2xl md:text-5xl font-bold">
                  3ACE CRM - Streamline Your Business Operations
                </h1>
                <p className="text-sm md:text-lg opacity-90 max-w-md">
                  A robust and scalable Customer Relationship Management system
                  designed to optimize your workflows.
                </p>
              </div>
              
              <div className="flex justify-center md:justify-end">
                <div className="bg-white bg-opacity-10 w-full  backdrop-blur-sm shadow-xl rounded-lg p-6 text-white">
                  <Signin />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto">
        {/* Role-based Navigation */}
        <div>
          <RoleBasedNavigation />
        </div>
{/* service banner */}
<div>
  <Image src={ServiceBanner} alt={"ServiceBanner"} className="w-full h-full object-contain" />
</div>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Why Choose ACE CRM?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <BarChart3 size={24} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">
                Real-Time Analytics
              </h3>
              <p className="text-gray-600 text-center">
                Make data-driven decisions with real-time insights and reports.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Users size={24} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">
                Seamless Collaboration
              </h3>
              <p className="text-gray-600 text-center">
                Empower your team with tools for seamless communication and
                collaboration.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <Activity size={24} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">
                Customizable Workflows
              </h3>
              <p className="text-gray-600 text-center">
                Tailor the CRM to fit your unique business processes.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <ServicesPage />
      </div>
    </div>
  );
}
