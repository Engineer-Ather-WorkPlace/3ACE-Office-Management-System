"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import AppRouts from "@/Constant/Constant";
import EditButton from "@/app/Components/EditProject";
import DeleteButton from "@/app/Components/DeleteProject";
import ProjectDetails from "@/app/Components/projectDetails";
import UpdateProject from "@/app/Components/UpdateProject";

const EmployeesRecord = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const response = await axios.get(AppRouts.getAllUsers);
        console.log("All Users ==>", response.data);
        setEmployees(response.data.data);
      } catch (error) {
        alert("Error fetching projects: " + error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllEmployees();
  }, []);

  // search filter
  useEffect(() => {
    const filteredData = employees.filter((employee) => {
      const searchLower = searchTerm.toLowerCase();

      // Convert joining date to YYYY-MM-DD format
      // const proposedDate = employee.joiningDate
      //   ? new Date(employee.joiningDate).toISOString().split("T")[0]
      //   : "";

      return (
        employee.name?.toLowerCase().includes(searchLower) ||
        employee.cnic?.toLowerCase().includes(searchLower) ||
        employee.position?.toLowerCase().includes(searchLower) ||
        employee.role?.toLowerCase().includes(searchLower) ||
        employee.phoneNumber?.toString().includes(searchLower) ||
        employee.email?.toLowerCase().includes(searchLower) ||
        employee.address?.toString().includes(searchLower) ||
        employee.userId?.toLowerCase().includes(searchLower)
      );
    });
    setFilteredEmployee(filteredData);
  }, [searchTerm, employees]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading)
    return (
      <div className="min-h-screen text-center text-xl font-semibold">
        Loading All Employees Data...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-lg text-red-500">Error: {error}</div>
    );

  return (
    <div className="min-h-screen text-text">
 
      <div className="w-full flex flex-col sm:flex-row justify-between shadow-md items-center underline decoration-heading p-4 mb-6 gap-4">
        {/* Title */}
        <h2 className="w-full sm:w-1/2 text-center sm:text-left text-md md:text-4xl font-serif text-heading">
          Employee Record
        </h2>

        {/* Search Container */}
        <div className="w-full sm:w-1/2 md:w-1/3 flex flex-col md:flex-row items-center gap-4">
         
          {/* Search result display */}
          {searchTerm && (
            <span className="text-sm md:text-lg font-serif text-gray-600">
              {filteredEmployee.length} result(s) found
            </span>
          )}
         
          <input
            className="w-full flex-grow text-center py-2 px-4 text-base rounded-lg border border-heading focus:outline-none focus:ring focus:ring-blue-900 shadow-sm"
            type="search"
            placeholder="Search here..."
            value={searchTerm}
            onChange={handleSearch}
          />

         
        </div>
      </div>

      {/* employees record table */}
      <div className="bg-white py-6 rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 font-serif text-left">
              <th className="p-3 text-md">Sr</th>
              <th className="p-3 text-md">Name && CNIC</th>
              <th className="p-3 text-md">Position</th>
              <th className="p-3 text-md">Role</th>
              <th className="p-3 text-md">Contact No</th>
              <th className="p-3 text-md">Email</th>
              <th className="p-3 text-md">Address</th>
              <th className="p-3 text-md">Employee-ID</th>
              <th className="p-3 text-md">Joining Date</th>
              <th className="p-3 text-md text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployee.length > 0 ? (
              filteredEmployee.map((data, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 hover:border border-black text-sm font-serif"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    {data.name}
                    <br />
                    {/* {data.cnic}{" "} */}
                    {data.cnin}{" "}
                  </td>
                  <td className="p-3">{data.position}</td>
                  <td className="p-3">{data.role}</td>
                  <td className="p-3">{data.phoneNumber}</td>
                  <td className="p-3">{data.email}</td>
                  <td className="p-3">{data.address}</td>
                  <td className="p-3">{data.userId}</td>
                  <td className="p-3">
                  { data.joiningDate?new Date(data.joiningDate)
                        .toISOString()
                        .split("T")[0] : "Not provided"
                    }
                    
                    </td>
                  <td className="p-3">
                    {/* {
                      new Date(data.joiningDate)
                        .toISOString()
                        .split("T")[0]
                    } */}
                  </td>

                  <td className="p-3 flex gap-2">
                    {/* <EditButton id={data.userId} />
                    <DeleteButton id={data.userId} />
                    <ProjectDetails Pid={data.userId} />
                    <UpdateProject Pid={data.userId}  /> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="16" className="text-center py-4">
                  Not found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesRecord;
