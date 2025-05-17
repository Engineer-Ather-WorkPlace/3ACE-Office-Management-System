"use client";

import { useState } from "react";
import axios from "axios";
import AppRouts from "@/Constant/Constant";
import { FileText, X } from "lucide-react";
// import { useRouter } from "next/router";
import { useParams, useRouter } from "next/navigation";

const ProjectDetails = ({ Pid }) => {
  const router = useRouter();
  return (
    <button
      className="text-green-500 px-2 py-1 rounded-md hover:bg-green-600 hover:text-white transition disabled:bg-gray-400"
      onClick={() => router.push(`/ProjectDetails/${Pid}`)}
    >
      <FileText size={18} />
    </button>
  );
};

export default ProjectDetails;
