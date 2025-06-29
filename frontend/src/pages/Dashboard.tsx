import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-lg p-10 bg-gray-900/80 border border-gray-700 rounded-2xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-blue-400 mb-4 drop-shadow">
          Welcome to your Dashboard!
        </h1>
        <p className="text-gray-200 text-lg">
          You are successfully authenticated 🎉
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
