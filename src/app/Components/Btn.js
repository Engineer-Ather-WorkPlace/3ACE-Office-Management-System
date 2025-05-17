import React from "react";



// const [loading, setLoading] = useState(false)
const Button = ({ title, bgColor, clr,loading=false,className,onPress ,onClick}) => {
  return (
      <button
        style={{ backgroundColor: bgColor, color: clr || "white", }}
        className={`w-full bg-blue-600 hover:bg-blue-800  font-semibold py-2 px-6 rounded-lg transition duration-2001 ${className}`}
        onPress={onPress}
        onClick={onClick}
      >
{loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="loader"></span> Loading...
        </span>
      ) : (
        title
      )}      </button>
  );
};

export default Button;
