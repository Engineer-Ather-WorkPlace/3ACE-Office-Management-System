"use client";

import { useState } from "react";
import axios from "axios";
import AppRouts from "@/Constant/Constant";
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation";

const DeleteButton = ({ id, Title }) => {

const router = useRouter()

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!id) {
      console.error("No ID provided for deletion.");
      return;
    }
alert("Are you sure you want to delete this project?")
    // const confirmDelete = window.confirm(`Are you sure you want to delete this project?:: ${Title} `);
    // if (!confirmDelete) return;

    setLoading(true);
    try {
      console.log("Deleting project with ID:", id);
      const response = await axios.delete(`${AppRouts.deleteProject}/${id}`);
      console.log("Deletion successful:", response.data);
      // Reload page 
      // window.location.reload();
      router.replace("/")

    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleDelete}
        type="button"
        className=" text-red-500 px-2 py-1 rounded-md hover:bg-red-600 hover:text-white transition disabled:bg-gray-400"
        disabled={loading}
      ><Trash size={18}/>
        {/* {loading ? "Deleting..." : "Delete"} */}
      </button>
    </div>
  );
};

export default DeleteButton;
