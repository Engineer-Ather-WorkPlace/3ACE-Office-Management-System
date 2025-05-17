//  page for edit project details
"use client";

import { useEffect, useState } from "react";
// import AppRouter from "@/Constant/Constant";
import AppRouts from "@/Constant/Constant";
import { Pencil, } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "./Btn";

const EditButton = ({ id }) => {

  const router = useRouter()

  const [editProjectDetails, setEditProjectDetails] = useState(false);
  const [projectCurrentDetails, setProjectCurrentDetails] = useState();
  const [loading, setLoading] = useState(false); 

  //  to get project details
  const fatchData = async () => {
    try {
      const projectdetails = await axios.get(`${AppRouts.editProject}/${id}`);
      console.log("project details: ", projectdetails.data.data);
      setProjectCurrentDetails(projectdetails.data.data);
    } catch (error) {
      alert("error", error.message);
    }
  };

  const handleClick = () => {
    console.log("project id", id); // Log the project id
    fatchData();
    setEditProjectDetails(true); // Open the modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // data to make change in project details  
    const updateData = {
      projectTitle: e.target.projectTitle.value,
      projectType: e.target.projectType.value,
      client: e.target.client.value,
      contactNo: e.target.contactNo.value,
      email: e.target.email.value,
      onboarding: e.target.onboarding.value,
      salesPerson: e.target.salesPerson.value,
      salesPersonID: e.target.salesPersonID.value,
      status: e.target.status.value,
      link: e.target.link.value,
      proposedCompletionDate: e.target.proposedCompletionDate.value,
      actualCompletionDate: e.target.actualCompletionDate.value,
      region: e.target.region.value,
      assignto: e.target.assignto.value,
    };

      // data to make change in sales Record
      const updatSalesdData = {

        projectTitle: e.target.projectTitle.value,
        projectType: e.target.projectType.value,
        client: e.target.client.value,
        contactNo: e.target.contactNo.value,
        email: e.target.email.value,
        salesPerson: e.target.salesPerson.value,
        salesPersonID: e.target.salesPersonID.value,
        status: e.target.status.value,

      } 


    console.log("New Project Data:", updateData);

    try {
      setLoading(true); // Loading state start

      const response = await axios.put(
        `${AppRouts.editProject}/${id}`,
        updateData
      );
      console.log("Server Response:", response.data);

      if (response.status === 200) {
        alert("Project updated successfully!");
        setEditProjectDetails(false); // Modal close if successful
        console.log("project ID : ", id);
        

        const res = await axios.post(AppRouts.updateSalesRecord,{projectID:id, updatSalesdData})
        // console.log("res22", res);        

        // window.location.reload();
        router.replace("/")
      } else {
        alert("Failed to update project.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Error updating project, please try again.");
    } finally {
      setLoading(false); // Ensure loading state stops
    }
  };

  return (
    <>
      {/* Edit Button */}
      <button
        onClick={handleClick} // Fixed: Call handleClick directly
        className=" text-blue-500 px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white transition"
      >
        <Pencil size={18}/>
      </button>

      {/* Modal */}
      {editProjectDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/90 p-4 rounded-lg shadow-2xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[95vh]">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-3xl font-serif text-heading">
                Edit Project Details <p className="text-lg">{id}</p>{" "}
              </h2>
              {/* Cancel Button */}
              <button
                onClick={() => setEditProjectDetails(false)} // Fixed: Use setEditProjectDetails
                className="text-4xl text-gray-600 hover:text-black transition duration-300"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Row 1: Project Title and Project Type */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="projectTitle"
                    className="block text-text text-md font-semibold font-serif"                    
                  >
                    Project Title
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter project title"
                    defaultValue={projectCurrentDetails?.projectTitle}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="projectType"
                    className="block text-text text-md font-semibold font-serif"
                  >
                    Project Type
                  </label>
                  <input
                    type="text"
                    name="projectType"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter project type"
                    defaultValue={projectCurrentDetails?.projectType}
                  />
                </div>
              </div>

              {/* Row 2: Client and Contact Number */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="client"
                    className="block text-text text-md font-semibold font-serif"
                  >
                    Client
                  </label>
                  <input
                    type="text"
                    name="client"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter client name"
                    defaultValue={projectCurrentDetails?.client}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="contactNo"
                    className="block text-text text-md font-semibold font-serif"
                  >
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="contactNo"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter contact number"
                    defaultValue={projectCurrentDetails?.contactNo}
                  />
                </div>
              </div>

              {/* Row 3: Email and Onboarding Date */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="email"
                    className="block text-text text-md font-semibold font-serif"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter email"
                    defaultValue={projectCurrentDetails?.email}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="onboarding"
                    className="block text-text text-md font-semibold font-serif"
                  >
                    Onboarding Date
                  </label>
                  <input
                    type="date"
                    name="onboarding"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    defaultValue={
                      projectCurrentDetails?.onboarding
                        ? new Date(projectCurrentDetails.onboarding)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                  />
                </div>
              </div>

              {/* Row 4: Sales Person and salesPersonID */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="salesPerson"
                    className="block text-text text-md font-semibold font-serif"
                  >
                    Sales Person
                  </label>
                  <input
                    type="text"
                    name="salesPerson"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter sales person name"
                    defaultValue={projectCurrentDetails?.salesPerson}
                  />
                </div>


                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="salesPersonID"
                    className="block text-text text-md font-semibold font-serif"
                  >
                    Sales salesPersonID
                  </label>
                  <input
                    type="text"
                    name="salesPersonID"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter sales person name"
                    defaultValue={projectCurrentDetails?.salesPersonID}
                  />
                </div>

              </div>

              {/* Row 5: Link and Proposed Completion Date */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="link"
                    className="block text-text text-md font-semibold font-serif"
                  >
                    Link
                  </label>
                  <input
                    type="text"
                    name="link"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    defaultValue={projectCurrentDetails?.link}
                    placeholder="Enter project link"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="proposedCompletionDate"
                    className="block text-text text-md font-semibold font-serif"
                  >
                    Proposed Completion Date
                  </label>
                  <input
                    type="date"
                    name="proposedCompletionDate"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    defaultValue={
                      projectCurrentDetails?.proposedCompletionDate
                        ? new Date(projectCurrentDetails.proposedCompletionDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                  />
                </div>
              </div>

              {/* Row 6: Actual Completion Date and Region */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="actualCompletionDate"
                    className="block text-text text-md font-semibold font-serif"
                  >
                    Actual Completion Date
                  </label>
                  <input
                    type="date"
                    name="actualCompletionDate"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    defaultValue={
                      projectCurrentDetails?.actualCompletionDate
                        ? new Date(projectCurrentDetails.actualCompletionDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="region"
                    className="block text-text text-md font-semibold font-serif"
                  >
                    Region
                  </label>
                  <input
                    type="text"
                    name="region"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter region"
                    defaultValue={projectCurrentDetails?.region}
                  />
                </div>
              </div>

              {/* Row 7: assignto */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="assignto"
                    className="block text-text text-md font-semibold font-serif"
                  >
                  assignto / Designer
                  </label>
                  <input
                    type="text"
                    name="assignto"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter assignto name"
                    defaultValue={projectCurrentDetails?.assignto}
                  />
                </div>

                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="status"
                    className="block text-text text-md font-semibold font-serif"
                  >
                    Status
                  </label>
                  <select
                    name="status"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    defaultValue={projectCurrentDetails?.status}
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                {/* <button
                  className="w-fit bg-blue-500 text-white text-xl font-semibold font-serif px-10 py-3 rounded-lg hover:bg-heading transition duration-100"
                  disabled={loading}
                  >
                  {loading ? "Submitting..." : "Submit"}
                  </button> */}
                <Button 
                className={"padding-4"}
                type="submit"
              title="Submit"
                loading={loading}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditButton;
