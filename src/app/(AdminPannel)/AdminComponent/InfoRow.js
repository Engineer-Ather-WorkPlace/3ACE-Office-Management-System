'use client'
const InfoRow = ({ label, value }) => (
    <div className="flex justify-between">
      <span className="text-blue-100 font-medium">{label}:</span>
      <span className="text-white">{value || 'N/A'}</span>
    </div>
  );
  export default InfoRow;