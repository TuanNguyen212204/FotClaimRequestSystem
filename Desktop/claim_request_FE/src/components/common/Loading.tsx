import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

const Loading: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {loading && (
        <div className="flex flex-col items-center">
          <FaSpinner className="text-5xl text-blue-600 animate-spin" />
          <p className="mt-3 text-lg text-gray-700">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Loading;
