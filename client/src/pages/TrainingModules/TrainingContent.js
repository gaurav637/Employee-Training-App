import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import HomeNavbar from '../../components/HomeNavbar';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-youtube';
const TrainingPage = () => {
  const { id } = useParams();
  const [trainingData, setTrainingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [videoTime, setVideoTime] = useState(0); // State to store the current video time
  const playerRef = useRef(null); // Reference to ReactPlayer

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/training/get-modules/${id}`);
        setTrainingData(response.data.module || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching training data:', error);
        setLoading(false);
      }
    };

    fetchTrainingData();
  }, [id]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(videoTime, 'seconds'); // Seek to the saved video time
    }
  }, [currentModuleIndex]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (trainingData.length === 0) {
    return <div className="flex justify-center items-center h-screen">No training modules available.</div>;
  }

  const currentModule = trainingData[currentModuleIndex];

  const handleNext = () => {
    if (currentModuleIndex < trainingData.length - 1) {
      setVideoTime(playerRef.current.getCurrentTime()); // Save the current video time
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentModuleIndex > 0) {
      setVideoTime(playerRef.current.getCurrentTime()); // Save the current video time
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  return (
    <div>
      <HomeNavbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="relative mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Module {currentModuleIndex + 1} of {trainingData.length}</h1>
          <p className="text-gray-500">Completion: {trainingData.reduce((acc, module) => acc + module.complete, 0)}%</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{currentModule.moduleName}</h2>
            <p className="text-gray-600 mb-4">{currentModule.summary}</p>
            <p className="text-gray-600 mb-2"><strong>Status:</strong> {currentModule.isComplete ? 'Completed' : 'In Progress'}</p>
          </div>

          <div className="lg:w-1/3 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{currentModule.moduleName} - Video</h2>
            <div className="w-full h-auto rounded-lg">
              <ReactPlayer
                ref={playerRef}
                url={currentModule.video}
                controls
                width="100%"
                height="auto"
                onProgress={({ playedSeconds }) => setVideoTime(playedSeconds)} // Update video time on progress
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentModuleIndex === 0}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentModuleIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentModuleIndex === trainingData.length - 1}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentModuleIndex === trainingData.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
