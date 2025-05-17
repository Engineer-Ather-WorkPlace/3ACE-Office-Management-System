"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import AppRouts from "@/Constant/Constant";
import EditButton from "@/app/Components/EditProject";
import DeleteButton from "@/app/Components/DeleteProject";
import ProjectDetails from "@/app/Components/projectDetails";
import UpdateProject from "@/app/Components/UpdateProject";
import ProjectChart from "@/app/Components/ProjectGraph";
import ImportToSales from "@/app/Components/ImportToSales";
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all projects
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(AppRouts.getAllProject);
        console.log(response.data.data.assignedDate);

        setProjects(response.data.data || []);
        setFilteredProjects(response.data.data || []);
      } catch (error) {
        alert("Error fetching projects: " + error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProjects();
  }, []);

  useEffect(() => {
    const filteredData = projects.filter((project) => {
      const searchLower = searchTerm.toLowerCase();

      // Convert dates to YYYY-MM-DD format
      const proposedDate = project.proposedCompletionDate
        ? new Date(project.proposedCompletionDate).toISOString().split("T")[0]
        : "";
      const actualDate = project.actualCompletionDate
        ? new Date(project.actualCompletionDate).toISOString().split("T")[0]
        : "";

      return (
        project.projectTitle?.toLowerCase().includes(searchLower) ||
        project.projectType?.toLowerCase().includes(searchLower) ||
        project.client?.toLowerCase().includes(searchLower) ||
        project.contactNo?.toLowerCase().includes(searchLower) ||
        project.email?.toLowerCase().includes(searchLower) ||
        project.projectCost?.toString().includes(searchLower) ||
        project.onboarding?.toLowerCase().includes(searchLower) ||
        project.salesPerson?.toLowerCase().includes(searchLower) ||
        project.status?.toLowerCase().includes(searchLower) ||
        project.link?.toLowerCase().includes(searchLower) ||
        project.assignto?.toLowerCase().includes(searchLower) ||
        proposedDate?.includes(searchLower) ||
        actualDate?.includes(searchLower)
      );
    });
    setFilteredProjects(filteredData);
  }, [searchTerm, projects]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-text">
      <div className="flex flex-col items-center w-full gap-2 md:flex-row md:justify-between">
        <div className="w-full md:w-1/2 flex flex-col items-end justify-end">
          <div className="w-full sm:w-3/4 flex flex-col sm:flex-row items-center gap-4 p-2">
            <input
              className="w-full py-2 px-4 text-sm md:text-base rounded-lg border border-heading focus:outline-blue-900 shadow-sm"
              type="search"
              placeholder="Search here..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="w-full sm:w-3/4 text-white text-sm bg-heading text-center text-heading shadow-md rounded-lg py-2 px-3">
              <span className="text-sm md:text-lg font-serif">
                {!searchTerm
                  ? "Search Here"
                  : `${filteredProjects.length} result(s) found`}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-end">
          <ProjectChart />
        </div>
      </div>

      <div className="bg-white py-6 rounded-lg overflow-x-auto m-6">
        <table className="w-full border-separate border-spacing-y-2 border-gray-100">
          <thead>
            <tr className="bg-gray-200 font-serif text-left p-4">
              <th className="p-3 text-md">Sr</th>
              <th className="p-3 text-md">Client & Project Title</th>
              <th className="p-3 text-md">Contacts</th>
              <th className="p-3 text-md">Cost</th>
              <th className="p-3 text-md">
                Sales <br /> Person
              </th>
              <th className="p-3 text-md">
                Refrence <br /> Link
              </th>
              <th className="p-3 text-md">
                Developer / <br /> Designer
              </th>
              <th className="p-3 text-md">
                Onboarding <br /> Date
              </th>
              <th className="p-3 text-md">
                Proposed <br /> Completion
              </th>
              <th className="p-3 text-md">
                Actual <br /> Completion
              </th>
              <th className="p-3 text-md">Status</th>
              <th className="p-3 text-md text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <tr
                  key={index}
                  className="bg-white shadow-md rounded-lg border border-gray-300 hover:shadow-lg hover:border-blue-400 hover:cursor-pointer
                text-sm font-serif hover:bg-gray-200"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    {`${project.client} ||  ${project.projectTitle} `}
                    <br />
                    {project.projectType}{" "}
                  </td>
                  <td className="p-3">
                    {project.contactNo}
                    <br />
                    {project.email}
                  </td>
                  <td className="p-3">{project.projectCost}</td>
                  <td className="p-3">{project.salesPerson}</td>
                  <td className="p-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  </td>

                  <td className="p-3 ">
                    {project.assignto}
                    <br />
                    {project.assignto == "Not Assigned"
                      ? "-x-x-x-"
                      : new Date(project.assignedDate)
                          .toISOString()
                          .split("T")[0]}
                  </td>

                  <td className="p-3">
                    {new Date(project.onboarding).toISOString().split("T")[0]}
                  </td>

                  <td className="p-3">
                    {project.proposedCompletionDate
                      ? new Date(project.proposedCompletionDate)
                          .toISOString()
                          .split("T")[0]
                      : "Not Decided"}
                  </td>
                  <td className="p-3">
                    {project.actualCompletionDate
                      ? new Date(project.actualCompletionDate)
                          .toISOString()
                          .split("T")[0]
                      : "Not Delivered"}
                  </td>

                  {/* <td className="p-3">
                    { new Date(project.actualCompletionDate)
                        .toISOString()
                        .split("T")[0]
                    }
                  </td> */}

                  <td
                    className={`p-3 font-semibold ${
                      project.status === "Completed"
                        ? "text-green-600"
                        : project.status === "Pending"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {project.status}
                  </td>
                  <td className="p-3 flex gap-2 items-center ">
                    <ImportToSales id={project._id} />
                    <EditButton id={project._id} />
                    <DeleteButton id={project._id} />
                    <ProjectDetails Pid={project._id} />
                    <UpdateProject
                      Pid={project._id}
                      projectTitle={project.projectTitle}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="16" className="text-center py-4">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Projects;
