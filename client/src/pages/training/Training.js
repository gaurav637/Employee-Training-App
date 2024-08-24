import React from 'react';

const TrainingPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Side: Training Module Details */}
      <div className="md:w-1/2 bg-white p-6 md:p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Training Module Title</h1>
        <p className="text-lg text-gray-700 mb-6">
          This section contains information about the training module. It could include details such as:
          <ul className="list-disc list-inside text-gray-600">
            <li>Overview of the training</li>
            <li>Objectives and goals</li>
            <li>Learning outcomes</li>
            <li>Prerequisites</li>
            <li>Duration and schedule</li>
          </ul>
        </p>
        <p className="text-gray-600">
          Additional information or descriptions related to the training module can be provided here.
        </p>
      </div>

      {/* Right Side: Video */}
      <div className="md:w-1/2 bg-gray-200 p-6 md:p-10 flex justify-center items-center">
        <div className="w-full max-w-4xl">
          <iframe
            className="w-full h-72 md:h-96"
            src="https://www.youtube.com/embed/your-video-id"
            title="Training Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
