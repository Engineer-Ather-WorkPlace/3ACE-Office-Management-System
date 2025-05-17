
"use client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Context/context";

const RoleBasedNavigation = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  // console.log("user in navigatio", user);
  if (!user) {
    router.replace("/");
    return;
  }

  useEffect(() => {
    if (!user) {
      router.replace("/");
      return;
    }

    if (user) {
      switch (user.role) {
        case "admin":
          router.replace("/AdminDashboard");
          break;
        case "employee":
          router.replace("/EmployeeDashboard");
          break;
        case "salesPerson":
          router.replace("/SalesPersonDashboard");
          break;
        case "developer":
          router.replace("/DeveloperDashBoard");
          break;
        case "graphicsDesigner":
          router.replace("/GraphicsDesignerDashBoard");
          break;
        default:
          alert("Unauthorized role!");
          router.replace("/");
      }
    }
  }, [user, router]);

  return null;
};

export default RoleBasedNavigation;
