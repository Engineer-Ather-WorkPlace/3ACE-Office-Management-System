
'use client'
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/app/Components/Logout";
import LOGO from "@/images/LOGO.jpeg";

export default function Navbar() {
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
    <nav className="bg-gradient-to-r from-gray-900 to-blue-900 text-white px-6 py-4 flex justify-between items-center relative shadow-md">
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
        {/* Large Screen Menu */}
        <div className="hidden md:flex items-center gap-5 w-full text-lg font-medium">
          <Link href="/" className="hover:scale-110 transition">
            Dashboard
          </Link>
          <Link href="/EmployeesRecord" className="hover:scale-110 transition">
            Employees
          </Link>
          <Link href="/SalesPageForAdmin" className="hover:scale-110 transition">
            Sales
          </Link>
        </div>

        {/* Profile Dropdown */}
        <div className="relative dropdown">
          <button
            onClick={() => setProfile(!profile)}
            className="flex items-center gap-2 hover:text-blue-300 transition"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white transform transition duration-200 hover:scale-110">
              <Image
                // src={LOGO}
                src="https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                alt="Profile"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            {/* <ChevronDown size={16} /> */}
          </button>

          {profile && (
            <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-lg shadow-lg border border-gray-300">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 transition text-center">
                  <Link href="/">Edit Profile</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 transition">
                  <LogoutButton />
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
        <div className="mt-5 absolute top-16 left-0 w-full bg-gradient-to-r from-gray-800 to-blue-800 p-6 md:hidden shadow-lg flex flex-col space-y-3">
          <div className=" w-full  text-lg font-medium space-y-5 ">
            <div className="hover:border-b-2 hover:text-center border-white py-1">
              <Link href="/">Dashboard</Link>
            </div>
            <div className="hover:border-b-2 hover:text-center border-white py-1">
              <Link href="/">Employees</Link>
            </div>
            <div className="hover:border-b-2 hover:text-center border-white py-1">
              <Link href="/">Project</Link>
            </div>
            <div className="hover:border-b-2 hover:text-center border-white py-1">
              <Link href="/">Sales</Link>
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="relative dropdown">
            <button
              onClick={() => setProfile(!profile)}
              className="flex items-center gap-2 hover:text-blue-300 transition"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <Image
                  src="https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <ChevronDown size={16} />
            </button>

            {profile && (
              <div className="mt-3 w-full bg-white text-black rounded-lg shadow-md border border-gray-300">
                <ul className="text-center">
                  <li className="px-4 py-2 hover:bg-gray-100 transition">
                    <Link href="/">Edit Profile</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 transition">
                    <LogoutButton />
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
