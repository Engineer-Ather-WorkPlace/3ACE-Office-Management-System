//user profile scrren 
'use client'

import EmployeeNavbar from "@/app/Components/EmployeNavebar";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/Context/context";
import UserInfoCard from "@/app/Components/UserInfoCard";
import { Mail, Phone, User, BadgeCheck, Calendar, MapPin, IdCard } from 'lucide-react';

const ViewUserProfile = () => {
    const { user } = useContext(AuthContext)
    console.log("user details :", user);

    // const { editProfile: objID } = useParams();

    return (
        <div className="min-h-screen flex flex-col gap-4 bg-gradient-to-br from-gray-900 to-blue-800 ">
            <EmployeeNavbar />

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg max-w-4xl mx-auto p-10">
                <div className="flex flex-col items-center">
                    {/* Profile Picture */}
                    <div className="w-32 h-32 rounded-full bg-white shadow-lg mb-4 flex items-center justify-center text-4xl font-bold text-blue-900">
                        {user?.name?.charAt(0)}
                    </div>

                    {/* Name and Role */}
                    <h2 className="text-2xl text-white font-bold">{user?.name}</h2>
                    <p className="text-blue-200 font-medium mb-6">{user?.position || user?.role}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-white">
                    {/* Left Column */}
                    <UserInfoCard label="User ID" value={user?.userId} icon={<IdCard />} />
                    <UserInfoCard label="Email" value={user?.email} icon={<Mail />} />
                    <UserInfoCard label="Phone" value={user?.phoneNumber.join(", ")} icon={<Phone />} />
                    <UserInfoCard label="CNIC" value={user?.cnin} icon={<BadgeCheck />} />

                    {/* Right Column */}
                    <UserInfoCard label="Joining Date" value={new Date(user?.joiningDate).toLocaleDateString()} icon={<Calendar />} />
                    <UserInfoCard label="Address" value={user?.address} icon={<MapPin />} />
                    <UserInfoCard label="Role" value={user?.role} icon={<User />} />
                    <UserInfoCard label="Created At" value={new Date(user?.createdAt).toLocaleDateString()} icon={<Calendar />} />
                </div>
            </div>
        </div>
    )
};

export default ViewUserProfile;
