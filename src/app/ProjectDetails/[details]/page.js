
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import AppRouts from "@/Constant/Constant";
import InfoCard from "@/app/(AdminPannel)/AdminComponent/InfoCard";
import InfoRow from "@/app/(AdminPannel)/AdminComponent/InfoRow";

const ProjectDetailsPage = (params) => {
  const [projectdetails, setProjectDetails] = useState();
  const [specificProject, setSpecificProject] = useState();
  const [indivusalSalesRecord, setIndivusalSalesRecord] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projectInfo, setprojectInfo] = useState({
    title: "Project Title",
    ID: "N/A",
  });

  const obj = {
    projectID: params.params.details,
  }

  //calling API for specific project
  useEffect(() => {
    const secificProject = async () => {
      try {
        const response = await axios.get(
          AppRouts.getSpecificProject + "/" + params.params.details
        );
        setSpecificProject(response.data.data);
      } catch (error) {
        console.log("Error in Fetching Specific Project", error);
      }
    };
    secificProject();
  }, [params]);

  // calling API to get project sales record
  useEffect(() => {
    const sealsRecord = async () => {
      try {
        const response = await axios.post(AppRouts.indivusalSalesRecord, obj);
        setIndivusalSalesRecord(response.data.data);
      } catch (error) {
        alert("Error in Fetching Project Sales Record ", error);
      }
    };
    sealsRecord();
  }, [params]);

  // calling API to get project details
  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const projectID = { projectID: params.params.details };
        const response = await axios.post(
          AppRouts.getProjectDetails,
          projectID
        );

        if (response.data?.data) {
          setProjectDetails(response.data.data);
        } else {
          setProjectDetails(null);
          setError("No project details found.");
        }
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError("No details Found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [params]);

  // Update project title & Project
  useEffect(() => {
    if (projectdetails?.length > 0) {
      setprojectInfo({
        title: projectdetails[0]?.projecTitle,
        ID: projectdetails[0]?.projectID,
      });
    }
  }, [projectdetails]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {projectInfo.title}
              </h1>
              <p className="text-lg text-blue-200 mt-1">
                Project ID: {projectInfo.ID || "N/A"}
              </p>
            </div>

            {/* Client Info Card */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 w-full md:w-96">
              <h2 className="text-xl font-semibold text-white mb-4">Project Info</h2>
              <div className="space-y-3">
                <InfoRow label="Client" value={specificProject?.client} />
                <InfoRow label="Email" value={specificProject?.email} />
                <InfoRow label="Contact" value={specificProject?.contactNo} />
                <InfoRow label="Sales Person" value={specificProject?.salesPerson} />
                <InfoRow label="Assigned To" value={specificProject?.assignto} />
                <InfoRow
                  label="Onboarding Date"
                  value={specificProject?.onboarding ? new Date(specificProject.onboarding).toLocaleDateString() : 'N/A'}
                />
                <InfoRow
                  label="Proposed Completion"
                  value={specificProject?.proposedCompletionDate ? new Date(specificProject.proposedCompletionDate).toLocaleDateString() : 'N/A'}
                />
                <InfoRow
                  label="Actual Completion"
                  value={specificProject?.actualCompletionDate ? new Date(specificProject.actualCompletionDate).toLocaleDateString() : 'Not completed yet'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sales Information Section */}
        {indivusalSalesRecord && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Sales Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Financial Details</h3>
                {indivusalSalesRecord?.projectCost && (
                  <InfoCard label="Project Cost" value={indivusalSalesRecord.projectCost} />
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Payment History</h3>
                {indivusalSalesRecord.paymentDetails?.length > 0 ? (
                  <div className="space-y-3">
                    {indivusalSalesRecord.paymentDetails.map((detail, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        <p className="font-medium text-gray-800">{detail.purpose}</p>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Amount: {detail.amount}</span>
                          <span>Date: {detail.date?.split("T")[0]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No payment records found</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Project History Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Project History</h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{error}</p>
            </div>
          ) : projectdetails?.length > 0 ? (
            <div className="space-y-6">
              {projectdetails.map((data, index) => (
                <div key={index} className="border-l-4 border-blue-500 bg-gray-50 pl-4 py-4 pr-4 rounded-md">

                  <div className="flex flex-col md:flex-row justify-between gap-3 mb-3">

                    {/* left box holding comment, Links and doc */}
                    <div>

                      {/* remarks */}
                      <div className="flex-1 my-4">
                        {data?.remarks && (
                          <p className=" font-medium break-words"> <b><u>Remarks: </u></b>
                          {data.remarks}</p>
                        )}
                      </div>

                      {/* Links Section */}
                      {
                        <div className="flex flex-col md:flex-row gap:4 md:gap-10 mb-1">
                          {data?.codeLinks && (<b> <u> Avilable Links : </u> </b>)}

                          {data?.codeLinks && (
                            <a
                              href={data.codeLinks}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md transition-colors text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                              Code
                            </a>
                          )}

                          {data?.deploymnetLink && (
                            <a
                              href={data.deploymnetLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 hover:bg-green-100 text-green-600 rounded-md transition-colors text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                              </svg>
                              Web / App
                            </a>
                          )}

                          {data?.refrenceLink && (
                            <a
                              href={data.refrenceLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-md transition-colors text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                              Reference
                            </a>
                          )}
                        </div>
                      }

                      {/* Document Section */}
                      {data?.document && (
                        <div className="mt-2 flex flex-col md:flex-row">
                          <a
                            href={data.document}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 text-sm"
                          ><b className="text-black pr-6"><u> Attached Document</u></b>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            View
                          </a>
                        </div>
                      )}

                    </div>

                    {/* roght side box */}
                    <div className="text-sm text-gray-500 min-w-fit">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{data?.userName}</span>
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                          {data?.userRole}
                        </span>
                      </div>

                      {data?.createdAt && (
                        <>
                          {new Date(data.createdAt).toLocaleDateString()} at{" "}
                          {new Date(data.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </>
                      )}

                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No project history available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProjectDetailsPage;