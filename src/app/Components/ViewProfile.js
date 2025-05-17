// profile view component 
"use client";
import { useRouter } from "next/navigation";

const ViewProfile = ({ uid }) => {
  const router = useRouter();
  return (
    <button
      className="w-full hover:bg-gradient-to-r from-gray-900 to-blue-900 px-3 py-1.5 rounded-md hover:bg-blue-700 hover:text-white "
      onClick={() => router.push(`/ViewProfile/${uid}`)}
    >
      Profile
    </button>
  );
};

export default ViewProfile;
