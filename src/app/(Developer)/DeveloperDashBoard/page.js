"use client";

import { useEffect, useState } from "react";
// import axios from "axios";
// import AppRouts from "@/Constant/Constant";
import AddNewProject from "@/app/Components/AddNewProject";
import EmployeeNavbar from "@/app/Components/EmployeNavebar";
import ProjectDetails from "@/app/Components/projectDetails";

const mockProjects = [
  {
    developerName: "Ali Khan",
    developerId: "DEV101",
    stack: "MERN",
    assignDate: "2025-05-01",
    handoverDate: "2025-05-01",
    duration: "2 weeks",
    deliveredDate: "2025-05-08",
    remarks: "Completed",
  },
  {
    developerName: "Sara Ahmed",
    developerId: "DEV102",
    stack: "Next.js / TypeScript",
    assignDate: "2025-05-11",
    handoverDate: "2025-05-12",
    duration: "2 weeks",
    deliveredDate: "2025-05-17",
    remarks: "pending",
  },
];

const Developer = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [mockProjects, setMockProject] = useState(mockProjects);

  // Fetch all projects
  // useEffect(() => {
  //   const fetchAllProjects = async () => {
  //     try {
  //       const response = await axios.get(AppRouts.getAllProject);
  //       setProjects(response.data.data || []);
  //       setFilteredProjects(response.data.data || []); // Initialize with all projects
  //     } catch (error) {
  //       alert("Error fetching projects: " + error.message);
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchAllProjects();
  // }, []);

  // useEffect(() => {
  //   const filteredData = mockProjects.filter((project) => {
  //     const searchLower = searchTerm.toLowerCase();

  //     // // Convert dates to YYYY-MM-DD format
  //     // const proposedDate = project.proposedCompletionDate
  //     //   ? new Date(project.proposedCompletionDate).toISOString().split("T")[0]
  //     //   : "";
  //     // const actualDate = project.actualCompletionDate
  //     //   ? new Date(project.actualCompletionDate).toISOString().split("T")[0]
  //     //   : "";

  //     return (
  //       // project.Sr.includes(searchLower) ||
  //       project.developerName?.toLowerCase().includes(searchLower) ||
  //       project.developerId?.toLowerCase().includes(searchLower) ||
  //       project.stack?.toLowerCase().includes(searchLower) ||
  //       project.assignDate?.toLowerCase().includes(searchLower) ||
  //       project.handoverDate?.toLowerCase().includes(searchLower) ||
  //       project.duration?.includes(searchLower) ||
  //       project.deliveredDate?.toLowerCase().includes(searchLower) ||
  //       project.remarks?.toLowerCase().includes(searchLower)
  //     );
  //   });

  //   setFilteredProjects(filteredData);
  // }, [searchTerm, projects]);

  useEffect(() => {
    if (!searchTerm) {
      // If search is empty, show all mock projects
      setFilteredProjects(mockProjects);
    } else {
      // Apply filter
      const filteredData = mockProjects.filter((project) => {
        const searchLower = searchTerm.toLowerCase();

        return (
          project.developerName?.toLowerCase().includes(searchLower) ||
          project.developerId?.toLowerCase().includes(searchLower) ||
          project.stack?.toLowerCase().includes(searchLower) ||
          project.assignDate?.toLowerCase().includes(searchLower) ||
          project.handoverDate?.toLowerCase().includes(searchLower) ||
          project.duration?.includes(searchLower) ||
          project.deliveredDate?.toLowerCase().includes(searchLower) ||
          project.remarks?.toLowerCase().includes(searchLower)
        );
      });

      setFilteredProjects(filteredData);
    }
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // if (loading) {
  //   return (
  //     <div className="text-center my-96 text-6xl font-semibold">
  //       Loading projects...
  //     </div>
  //   );
  // }

  return (
    <div className=" min-h-screen text-text ">
      {/* navbar */}
      <EmployeeNavbar />

      {/* Header Section */}
      <div className="w-full flex gap-10 shadow-md items-center underline decoration-heading p-4 ">
        <h2 className="text-md md:text-4xl font-serif text-heading">
          Project Details
        </h2>
        <AddNewProject />
      </div>

      <div className="flex flex-col items-center w-full gap-2 md:flex-row md:justify-between">
        {/* Search Bar Section */}
        <div className=" w-full md:w-1/2 flex flex-col items-end justify-end ">
          <div className="w-full sm:w-3/4 flex flex-col sm:flex-row items-center gap-4 p-2">
            <input
              className="w-full py-2 px-4 text-sm md:text-base rounded-lg border border-heading focus:outline-blue-900 "
              type="search"
              placeholder="Search here..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="w-full sm:w-3/4  text-white text-sm bg-heading text-center text-heading shadow-md rounded-lg py-2 px-3">
              <span className="text-sm md:text-lg font-serif">
                {!searchTerm
                  ? "Search here"
                  : `${filteredProjects.length} result(s) found`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project List Table */}
      <div className="bg-white py-6 rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 font-serif text-left">
              <th className="p-3 text-md">#</th>
              <th className="p-3 text-md">Developer Name</th>
              <th className="p-3 text-md">Developer ID</th>
              <th className="p-3 text-md">Stack</th>
              <th className="p-3 text-md">Assigned Date</th>
              <th className="p-3 text-md">Duration</th>
              <th className="p-3 text-md">Delivered Date</th>
              <th className="p-3 text-md">Remarks</th>
            </tr>
          </thead>

          <tbody>
            {filteredProjects.map((project, index) => (
              <tr key={index} className="hover:bg-gray-100 text-sm">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{project.developerName}</td>
                <td className="p-3">{project.developerId}</td>
                <td className="p-3">{project.stack}</td>
                <td className="p-3">
                  {new Date(project.assignDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {new Date(project.deliveredDate).toLocaleDateString()}
                </td>
                <td className="p-3">{project.duration}</td>
                <ProjectDetails />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Developer;
