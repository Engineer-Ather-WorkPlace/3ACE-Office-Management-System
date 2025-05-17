"use client";

import { useEffect, useState } from "react";
import AppRouts from "@/Constant/Constant";
import { Pencil, } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "@/app/Components/Btn";

const AddNewSale = ({ pid, projectTitle }) => {

  const router = useRouter()

  const [addPayment, setAddPayment] = useState(false)
  const [loading, setLoading] = useState()

  const handleClick = () => {
    console.log("project id : ", pid);
    // console.log("project title : ", projectTitle);
    setAddPayment(true)

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const _amount = e.target.amount.value
    const _paymentDate = e.target.paymentDate.value
    const _purpose = e.target.purpose.value

    if (!_amount || !_paymentDate || !_purpose) {
      alert("all feilds are reuired")
      return
    }

    const newPayment = {
      amount: Number(_amount),
      date: _paymentDate,
      purpose: _purpose
    };

    console.log("projectID : ", pid);

    console.log("New Payment : ", newPayment);
    try {
      setLoading(true);
      const response = await axios.post(AppRouts.addNewPaymentt, { projectID: pid, newPayment });
      // console.log("response : ", add.data);
      setAddPayment(false); // Close the modal
      console.log("current path", router.asPath);
      
      // window.location.reload();

      router.replace("/");
      // router.replace(router.asPath??"/AdminPannel/SalesPageForAdmin");
      
      e.target.reset();     // Reset the form
    } catch (error) {
      console.log(error?.response?.data?.msg || error.message);
    } finally {
      setLoading(false); // Ensure loading is false in both cases
    }
  }

  return (
    <div>

      <button
        onClick={handleClick} // Fixed: Call handleClick directly
        className=" text-xs bg-gray-200 hover:bg-heading hover:text-white px-2 py-1 rounded"
        >
          + Add New
        {/* <Pencil size={18} /> */}
      </button>

      {/* Modal */}
      {addPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/90 p-4 rounded-lg shadow-2xl w-full max-w-4xl mx-4 overflow-y-auto max-h-[95vh]">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-3xl font-serif text-heading">
                Add Payment Details
                <p className="text-lg">{projectTitle} {" ("}{pid}{")"}</p>{" "}
              </h2>
              {/* Cancel Button */}
              <button
                onClick={() => setAddPayment(false)} // Fixed: Use setEditProjectDetails
                className="text-4xl text-gray-600 hover:text-black transition duration-300"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Row 1: Project Title and Project Type */}
              <div className="flex flex-col md:flex-row gap-4">

                {/* amount */}
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="amount"
                    className="block text-text text-md font-semibold font-serif"
                  >
                    Amount
                  </label>
                  <input
                    type="text"
                    name="amount"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                    placeholder="Enter project title"
                  // defaultValue={projectCurrentDetails?.projectTitle}
                  />
                </div>

                {/* payment date */}
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="paymentDate"
                    className="block text-text text-md font-semibold font-serif"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    name="paymentDate"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                  // defaultValue={
                  //   projectCurrentDetails?.onboarding
                  //     ? new Date(projectCurrentDetails.onboarding)
                  //         .toISOString()
                  //         .split("T")[0]
                  //     : ""
                  // }
                  />
                </div>
              </div>

              {/* payment Purpose */}
              <div className="w-full ">
                <label
                  htmlFor="purpose"
                  className="block text-text text-md font-semibold font-serif"
                >
                  Payment Purpose / Details
                </label>
                <input
                  type="text"
                  name="purpose"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-heading"
                  placeholder="Enter project type"
                // defaultValue={projectCurrentDetails?.projectType}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                {/* <button
                  type="submit"
                  className="w-fit bg-blue-500 text-white text-xl font-semibold font-serif px-10 py-3 rounded-lg hover:bg-heading transition duration-100"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button> */}
                <Button
                title={"Submit"}
                type="submit"
                loading={loading}
                
                />
              </div>
            </form>

          </div>

        </div>
      )}
    </div>
  )
}

export default AddNewSale