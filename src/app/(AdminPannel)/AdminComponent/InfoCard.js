'use client';
const InfoCard = ({ label, value }) => (
    <div className="bg-gray-50 p-4 rounded-md">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  );

  export default InfoCard;