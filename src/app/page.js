import Image from "next/image";
import MainSCreen from "./Components/MainScreen";

export default function Home() {
  return (
      <div className="bg-globalBackground to-blue-900 min-h-screen flex items-center justify-center ">
      <MainSCreen />
    </div>
  );
}
