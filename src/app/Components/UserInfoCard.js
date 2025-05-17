// 'use client';
// const UserInfoCard = ({ label, value }) => (
//     <div className="bg-gray-50 p-4 rounded-md">
//       <p className="text-sm text-gray-500">{label}</p>
//       <p className="text-lg font-semibold text-gray-800">{value}</p>
//     </div>
//   );

//   export default UserInfoCard;


const UserInfoCard = ({ label, value, icon }) => (
  <div className="flex items-center bg-white bg-opacity-20 p-4 rounded-xl shadow-md hover:bg-opacity-30 transition duration-300">
    <div className="mr-4 text-blue-200">{icon}</div>
    <div>
      <p className="text-sm text-blue-100">{label}</p>
      <p className=" text-sm md:text-lg font-semibold">{value}</p>
    </div>
  </div>
);
export default UserInfoCard;