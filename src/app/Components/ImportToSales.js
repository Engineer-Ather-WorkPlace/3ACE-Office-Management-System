
"use client";

import { useEffect, useState } from "react";
import AppRouts from "@/Constant/Constant";
import axios from "axios";

const ImportToSales = ({ id }) => {
  const [currentProjectDetails, setCurrentProjectDetails] = useState(null);
  const [loading, setLoading] = useState(false); // For fetching data
  const [importing, setImporting] = useState(false); // For importing to sales

  // To get project details
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${AppRouts.editProject}/${id}`); //edit api use here to get current project details 
      setCurrentProjectDetails(response.data.data);
    } catch (error) {
      alert("Error fetching project: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handles button click
  const handleClick = () => {
    fetchData();
  };

  // Runs when currentProjectDetails is updated
  useEffect(() => {
    if (!currentProjectDetails) return;

    const salesDetails = {
      projectTitle: currentProjectDetails.projectTitle,
      projectType: currentProjectDetails.projectType,
      projectID: currentProjectDetails._id,
      client: currentProjectDetails.client,
      contactNo: currentProjectDetails.contactNo,
      email: currentProjectDetails.email,
      salesPerson: currentProjectDetails.salesPerson,
      salesPersonID: currentProjectDetails.salesPersonID,
      projectCost: currentProjectDetails.projectCost,
      paymentDetails: currentProjectDetails.paymentDetails,
      projectDeliveryDate: currentProjectDetails.projectDeliveryDate,
      status: currentProjectDetails.status,
    };

    const importToSalesRecord = async () => {
      try {
        setImporting(true);
        const response = await axios.post(AppRouts.createProjectSalesReacord, salesDetails);
        alert(response.data.msg);
      } catch (error) {
        alert(error.response?.data?.msg || "Error while importing to sales");
      } finally {
        setImporting(false);
      }
    };

    importToSalesRecord();
  }, [currentProjectDetails]);

  return (
    <div className="flex justify-end">
      <button
        onClick={handleClick}
        type="button"
        className="text-blue-600 px-2 py-1 rounded-md hover:bg-blue-700 hover:text-white transition disabled:bg-gray-400"
        disabled={loading || importing}
      >
        {loading
          ? "Fetching..."
          : importing
          ? "Importing..."
          : "Import to Sales"}
      </button>
    </div>
  );
};

export default ImportToSales;
