"use client";

import { useState, useEffect } from "react";
import AppRouts from "@/Constant/Constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "./Btn";

const AddNewProject = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  //   const [userDetails, setUserDetails] = useState(null);
  const [newProjectForm, setNewProjectForm] = useState(false);
  const [allProject, setAllProject] = useState()


  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await axios.get(AppRouts.getAllProject);
        setAllProject(response.data.data || []);
        // console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        alert(error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchAllProjects();
  }, []);



  const handleSubmit = async (e) => {
    // console.log("New Project Details", e.target.email.value);
    console.log("New Project Details", e.target.projectCost.value);
    e.preventDefault(); // Form submission ko default behavior se rokne ke liye

    const newProjectData = {
      projectTitle: e.target.projectTitle.value,
      projectType: e.target.projectType.value,
      // projectID: `PI-3ACE-TECH-0${e.target.projectId.value}0`,
      client: e.target.client.value,
      contactNo: e.target.contactNo.value,
      email: e.target.email.value,
      onboarding: e.target.onboarding.value,
      salesPerson: e.target.salesPerson.value,
      status: e.target.status.value,
      link: e.target.link.value,
      proposedCompletionDate: e.target.proposedCompletionDate.value,
      actualCompletionDate: e.target.actualCompletionDate.value,
      region: e.target.region.value,
      developer: e.target.developer.value,
      projectCost: e.target.projectCost.value,

    };

    // console.log("New Project Data:", newProjectData);
    setLoading(true);
    try {
      const response = await axios.post(AppRouts.addNewProject, newProjectData);
      alert("save data sucessfully");
      setNewProjectForm(false);
      // window.location.reload();
     
      router.replace("/");
      e.target.reset();     // Reset the form

      // window.location.reload();
    } catch (error) {
      alert("ERROR: " + error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Button to Open Modal */}
      <button
        onClick={() => setNewProjectForm(true)}
        className="bg-heading text-white text-lg px-3 py-1 md-px-5 rounded-full hover:bg-heading/90 transition duration-300 shadow-md"
      >
        +
      </button>

      {/* Modal */}
      {newProjectForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/90 p-4 rounded-lg shadow-2xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[95vh]">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-3xl font-serif text-heading">
                Add New Project
              </h2>
              {/* Cancel Button */}
              <button
                onClick={() => setNewProjectForm(false)}
                className="text-4xl text-gray-600 hover:text-black transition duration-300"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              
              {/* Row 1: Project Title and Project Type */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="projectTitle"
                    className="block text-text text-sm font-semibold font-serif"
                  >
                    Project Title
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter project title"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="projectType"
                    className="block text-text text-sm font-semibold font-serif"
                  >
                    Project Type
                  </label>
                  <input
                    type="text"
                    name="projectType"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter project type"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Client and Contact Number */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="client"
                    className="block text-text text-sm font-semibold font-serif"
                  >
                    Client
                  </label>
                  <input
                    type="text"
                    name="client"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter client name"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="contactNo"
                    className="block text-text text-sm font-semibold font-serif"
                  >
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="contactNo"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter contact number"
                    required
                  />
                </div>
              </div>

              {/* Row 3: Email and Onboarding Date */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="email"
                    className="block text-text text-sm font-semibold font-serif"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter email"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="onboarding"
                    className="block text-text text-sm font-semibold font-serif"
                  >
                    Onboarding Date
                  </label>
                  <input
                    type="date"
                    name="onboarding"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    required
                  />
                </div>
              </div>

              {/* Row 4: Sales Person and Status */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="salesPerson"
                    className="block text-text text-sm font-semibold font-serif"
                  >
                    Sales Person
                  </label>
                  <input
                    type="text"
                    name="salesPerson"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter sales person name"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="status"
                    className="block text-text text-sm font-semibold font-serif"
                  >
                    Status
                  </label>
                  <select
                    name="status"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    required
                  >
                    {/* <option value="In Progress">In Progress</option> */}
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Link and Proposed Completion Date */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="link"
                    className="block text-text text-sm font-semibold font-serif"
                  >
                    Link
                  </label>
                  <input
                    type="text"
                    name="link"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter project link"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="proposedCompletionDate"
                    className="block text-text text-sm font-semibold font-serif"
                  >
                    Proposed Completion Date
                  </label>
                  <input
                    type="date"
                    name="proposedCompletionDate"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                  />
                </div>
              </div>

              {/* Row 6: Actual Completion Date and Region */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="actualCompletionDate"
                    className="block text-text text-sm font-semibold font-serif"
                  >
                    Actual Completion Date
                  </label>
                  <input
                    type="date"
                    name="actualCompletionDate"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="region"
                    className="block text-text text-sm font-semibold font-serif"
                  >
                    Region
                  </label>
                  <input
                    type="text"
                    name="region"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter region"
                    required
                  />
                </div>
              </div>

              {/* Row 7: Developer  & Designer*/}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="developer"
                    className="block text-text text-sm font-semibold font-serif"
                  >
                    Developer
                  </label>
                  <input
                    type="text"
                    name="developer"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter developer name"
                    defaultValue="Not Assigned"
                  />
                </div>

                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="projectCost"
                    className="block text-text text-sm font-semibold font-serif"
                  >
                    Project Cost
                  </label>
                  <input
                    type="string"
                    name="projectCost"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    required
                  />
                </div>
              </div>

               {/* Row 8:  */}
               {/* <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="projectId"
                    className="block text-text text-sm font-semibold font-serif"
                  >
                    Project ID
                  </label>
                  <input
                    type="text"
                    name="projectId"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter projectId"
                    // required
                  />
                </div>
                </div> */}

              {/* Submit Button */}
              <div className="flex w-1/2 justify-center align-center mx-auto mt-4">
                {/* <button
                  type="submit"
                  className="w-fit bg-blue-500 text-white text-sm font-semibold font-serif px-10 py-3 rounded-lg hover:bg-heading transition duration-100"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button> */}
                <Button
                type="submit"
                  title="Submit"
                loading={loading}
                >
                  </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewProject;
