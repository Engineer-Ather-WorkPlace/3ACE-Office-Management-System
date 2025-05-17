"use client";

import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AppRouts from "@/Constant/Constant";
import axios from "axios";

export default function ProjectChart() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProject, setTotalProject] = useState(0);
  const [pendingProject, setPendingProject] = useState(0);
  const [completeProject, setCompleteProject] = useState(0);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await axios.get(AppRouts.getAllProject);
        const projectData = response.data.data || [];

        console.log("API Response:", projectData);

        setProjects(projectData);
        setTotalProject(projectData.length);
        setPendingProject(projectData.filter(proj => proj.status.toLowerCase() === "pending").length);
        setCompleteProject(projectData.filter(proj => proj.status.toLowerCase() === "completed").length);

      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  const percentageComplete = totalProject > 0 ? (completeProject / totalProject) * 100 : 0;
  const percentagePending = totalProject > 0 ? (pendingProject / totalProject) * 100 : 0;

  return (
    <div className="w-full ">
      
      {/* <h2 className="text-heading text-xl md:text-4xl text-center font-serif pt-10 mb-12">
        Project Status
      </h2> */}

      {loading ? (
        <p className="text-center text-gray-600">Loading projects...</p>
      ) : error ? (
        <p className="text-center text-red-600">Error: {error}</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-14">
          {/* Total Projects */}
          <div className="flex flex-col items-center w-20 lg:w-28">
            <p className="font-semibold text-sm text-gray-700 mb-2">Total</p>
            <div className="w-18 md:w-20">
              <CircularProgressbar
                value={100}
                text={`${totalProject}`}
                styles={buildStyles({
                  textColor: "#333",
                  pathColor: "#3182CE",
                  trailColor: "#E2E8F0",
                  textSize: "24px",
                })}
              />
            </div>
          </div>

          {/* Complete Projects */}
          <div className="flex flex-col items-center w-20 lg:w-28">
            <p className="font-semibold text-sm text-green-600 mb-2">Completed</p>
            <div className="w-18 md:w-20">
              <CircularProgressbar
                value={percentageComplete}
                text={`${completeProject}`}
                styles={buildStyles({
                  textColor: "#38A169",
                  pathColor: "#38A169",
                  trailColor: "#C6F6D5",
                  textSize: "24px",
                })}
              />
            </div>
            <p className="text-sm text-green-700 mt-1">({percentageComplete.toFixed(1)}%)</p>
          </div>

          {/* Pending Projects */}
          <div className="flex flex-col items-center w-20 lg:w-28">
            <p className="font-semibold text-sm text-red-600 mb-2">Pending</p>
            <div className="w-18 md:w-20">
              <CircularProgressbar
                value={percentagePending}
                text={`${pendingProject}`}
                styles={buildStyles({
                  textColor: "#E53E3E",
                  pathColor: "#E53E3E",
                  trailColor: "#FED7D7",
                  textSize: "24px",
                })}
              />
            </div>
            <p className="text-sm text-red-700 mt-1">({percentagePending.toFixed(1)}%)</p>
          </div>
        </div>
      )}
    </div>
  );
}
