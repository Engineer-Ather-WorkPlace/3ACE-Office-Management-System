// component using to pass user id to change pasword
"use client";
import { useRouter } from "next/navigation";

const EditUserProfile = ({ uid}) => {
  const router = useRouter();
  return (
    <button
     className="w-full hover:bg-gradient-to-r from-gray-900 to-blue-900 px-3 py-1.5 rounded-md hover:bg-blue-700 hover:text-white"
     
      onClick={() => router.push(`/EditUserProfile/${uid}`)}
    >
       Edit Password
    </button>
  );
};

export default EditUserProfile;
