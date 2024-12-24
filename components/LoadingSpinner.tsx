import React from "react";

const LoadingSpinner = () => (
    <div className="flex justify-center items-center space-x-2">
        <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
        <span className="text-lg text-gray-600">提交中...</span>
    </div>
);

export default LoadingSpinner;
