//nav bar for app epployee
"use client";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/Context/context";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/app/Components/Logout";
import LOGO from "@/images/LOGO.jpeg";
import EditUsersProfile from "./EditProfile";
import ViewProfile from "./ViewProfile";

export default function EmployeeNavbar() {
  const { user } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsOpen(false);
        setProfile(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-blue-900 text-white px-6 py-2 flex justify-between items-center relative shadow-md z-50">
      {/* Logo */}
      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white">
        <Image
          src={LOGO}
          alt="Logo"
          width={56}
          height={56}
          className="object-cover"
        />
      </div>

      {/* Large Screen Menu */}
      <div className="font-serif hidden md:flex justify-between items-center w-fit space-x-6 text-lg font-medium">
        <div className="hidden md:flex items-center gap-5 w-full text-lg font-medium">
          {user?.name} <br /> {user?.role}
        </div>

        {/* Profile Dropdown */}
        <div className="relative dropdown">
          <button
            onClick={() => setProfile(!profile)}
            className="flex items-center gap-2 hover:text-blue-300 transition"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white transform transition duration-200 hover:scale-110">
              <Image
                src="https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                alt="Profile"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          </button>

          {profile && (
           <div className="absolute right-0 mt-3 w-56 bg-white text-black rounded-lg shadow-xl border border-gray-200 z-50">
           <ul className="divide-y divide-gray-200">
             <li className="hover:bg-gradient-to-r from-gray-900 to-blue-900 hover:text-white transition rounded-t-lg">
               <Link
                 href="/SalesPersonDashboard"
                 className="block px-4 py-3 text-center"
               >
                 Dashboard
               </Link>
             </li>
             <li className="hover:bg-gradient-to-r from-gray-900 to-blue-900 hover:text-white transition">
               <div className="px-4 py-3 text-center">
                 <ViewProfile uid={user?.id} />
               </div>
             </li>
             <li className="hover:bg-gradient-to-r from-gray-900 to-blue-900 hover:text-white transition">
               <div className="px-4 py-3 text-center">
                 <EditUsersProfile uid={user?.id} />
               </div>
             </li>
             <li className="hover:bg-gradient-to-r from-gray-900 to-blue-900 hover:text-white transition rounded-b-lg">
               <div className="px-4 py-3 text-center">
                 <LogoutButton />
               </div>
             </li>
           </ul>
         </div>
         
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
            setIsOpen(false);
            setProfile(false);
          }}
          className="focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gradient-to-r from-gray-800 to-blue-800 p-8 md:hidden shadow-lg flex flex-col space-y-3 z-50">
          {/* Profile Dropdown */}
          <div className="relative dropdown">
            <button
              onClick={() => setProfile(!profile)}
              className="flex items-center gap-4 hover:text-blue-300 transition"
            >
              <div className="w-10 h-10 rounded-md overflow-hidden border-2 border-white">
                <Image
                  src="https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              {user?.name}
              <ChevronDown size={16} />
            </button>

            {profile && (
              <div className="absolute right-0 mt-3 w-56 bg-white text-black rounded-lg shadow-xl border border-gray-200 z-50">
              <ul className="divide-y divide-gray-200">
                <li className="hover:bg-gradient-to-r from-gray-900 to-blue-900 hover:text-white transition rounded-t-lg">
                  <Link
                    href="/SalesPersonDashboard"
                    className="block px-4 py-3 text-center"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="hover:bg-gradient-to-r from-gray-900 to-blue-900 hover:text-white transition">
                  <div className="px-4 py-3 text-center">
                    <ViewProfile uid={user?.id} />
                  </div>
                </li>
                <li className="hover:bg-gradient-to-r from-gray-900 to-blue-900 hover:text-white transition">
                  <div className="px-4 py-3 text-center">
                    <EditUsersProfile uid={user?.id} />
                  </div>
                </li>
                <li className="hover:bg-gradient-to-r from-gray-900 to-blue-900 hover:text-white transition rounded-b-lg">
                  <div className="px-4 py-3 text-center">
                    <LogoutButton />
                  </div>
                </li>
              </ul>
            </div>
            
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
