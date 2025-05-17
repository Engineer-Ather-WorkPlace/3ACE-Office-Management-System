'use client'
import EmployeeNavbar from "@/app/Components/EmployeNavebar";
import { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/context";
import axios from "axios";
import AppRouts from "@/Constant/Constant";
import UpdateProject from "@/app/Components/UpdateProject"; // Ensure this is imported

const GraphicsDesignerDashBoard = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchAssignedProjects = async () => {
    
      const uid = user?.userId
      // console.log("user in graphics designer dashboard", uid);
      
      try {
        const response = await axios.post(AppRouts.assignProjects, {
          assignto: uid,
        });
        setProjects(response.data.data ); 
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchAssignedProjects();
  }, [user]);

  return (
    <div className="min-h-screen text-text">
      {/* <RoleBasedNavigation/> */}

      <EmployeeNavbar />

      <div className="mb-10 w-full flex gap-10 shadow-md items-center underline decoration-heading p-4 ">
        <h2 className="text-md md:text-4xl font-serif text-heading">
           {user?.userId }
        </h2>
      </div>
       

       <div className=" py-6 rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 font-serif text-left">
              <th className="p-3 text-md">Sr</th>
              <th className="p-3 text-md">Client & Project Title</th>
              <th className="p-3 text-md">Type</th>
              {/* <th className="p-3 text-md">Contact</th>
              <th className="p-3 text-md">Email</th>
              <th className="p-3 text-md">Cost</th> */}
              <th className="p-3 text-md">Sales Person</th>
              <th className="p-3 text-md">Reference Link</th>
              <th className="p-3 text-md">Developer / Designer</th>
              <th className="p-3 text-md">Onboarding Date</th>
              <th className="p-3 text-md">Proposed Completion</th>
              <th className="p-3 text-md">Actual Completion</th>
              <th className="p-3 text-md">Status</th>
              <th className="p-3 text-md text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <tr
                  key={index}
                  className="bg-white hover:bg-gray-100 hover:border border-black text-sm font-serif"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{`${project.client} ||  ${project.projectTitle}`}</td>
                  <td className="p-3">{project.projectType}</td>
                  {/* <td className="p-3">{project.contactNo}</td>
                  <td className="p-3">{project.email}</td>
                  <td className="p-3">{project.projectCost}</td> */}
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
                  {/* <td className="p-3">{project.assignto}</td> */}
                  <td className="p-3">{project.assignto}<br/>
                  {new Date(project.assignedDate).toISOString().split("T")[0]}</td>


                  <td className="p-3">
                    {project.onboarding ? new Date(project.onboarding).toISOString().split("T")[0] : "N/A"}
                  </td>
                  <td className="p-3">
                    {project.proposedCompletionDate ? new Date(project.proposedCompletionDate).toISOString().split("T")[0] : "N/A"}
                  </td>
                  <td className="p-3">
                    {project.actualCompletionDate ? new Date(project.actualCompletionDate).toISOString().split("T")[0] : "N/A"}
                  </td>
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
                  <td className="p-3 flex gap-2">
                    <UpdateProject Pid={project._id} projectTitle={project.projectTitle} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="16" className="text-center py-4">No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GraphicsDesignerDashBoard;

