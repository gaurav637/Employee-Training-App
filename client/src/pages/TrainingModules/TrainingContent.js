import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import HomeNavbar from '../../components/HomeNavbar';
import { useParams } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const TrainingContent = () => {
  const { id } = useParams();
  const [trainingData, setTrainingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [videoTime, setVideoTime] = useState(0); // State to store the current video time
  const playerRef = useRef(null); // Reference to Video.js player
  const videoContainerRef = useRef(null); // Reference to the video container

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
    if (trainingData.length > 0) {
      const videoElement = document.createElement('video');
      videoElement.className = 'video-js vjs-default-skin';
      videoElement.setAttribute('playsinline', 'true'); // Add playsinline attribute
      const videoContainer = videoContainerRef.current;
      if (videoContainer) {
        videoContainer.innerHTML = ''; // Clear previous video elements
        videoContainer.appendChild(videoElement);
      }

      const videoUrl = trainingData[currentModuleIndex]?.video;
      if (!videoUrl) {
        console.error('Invalid video URL:', videoUrl);
        return;
      }

      const player = videojs(videoElement, {
        controls: true,
        autoplay: false,
        preload: 'auto', // Preload entire video for smoother playback
        fluid: true,
        sources: [{ src: videoUrl, type: 'video/mp4' }]
      });

      playerRef.current = player;

      player.on('timeupdate', () => {
        setVideoTime(player.currentTime());
      });

      // Handle buffering indicator (optional)
      player.on('waiting', () => {
        console.log('Buffering...');
      });

      player.on('canplay', () => {
        console.log('Playback ready');
      });

      player.on('error', (e) => {
        console.error('Video playback error:', e);
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
        if (videoContainer && videoContainer.contains(videoElement)) {
          videoContainer.removeChild(videoElement);
        }
      };
    }
  }, [currentModuleIndex, trainingData]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.currentTime(videoTime); // Seek to the saved video time
    }
  }, [videoTime]);

  useEffect(() => {
    const isCurrentModuleComplete = trainingData[currentModuleIndex]?.isComplete;

    if (isCurrentModuleComplete && currentModuleIndex < trainingData.length - 1) {
      handleNext(); // Automatically go to the next module
    }
  }, [trainingData, currentModuleIndex]);

  const handleNext = async () => {
    if (currentModuleIndex < trainingData.length - 1) {
      console.log("currentModuleIndex" , currentModuleIndex);
      // Mark the current module as complete
      const updatedModules = [...trainingData];
      updatedModules[currentModuleIndex] = { ...updatedModules[currentModuleIndex], isComplete: true };
      setTrainingData(updatedModules);

      // Move to the next module
      setVideoTime(playerRef.current.currentTime()); // Save the current video time
      setCurrentModuleIndex(currentModuleIndex + 1);

      // Optionally, send completion status to the backend
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/training/update-module/${id}`, {
          moduleId: trainingData[currentModuleIndex]._id,
          isComplete: true
        });
      } catch (error) {
        console.error('Error updating module completion:', error);
      }
    }
  };

  const handlePrevious = () => {
    if (currentModuleIndex > 0) {
      setVideoTime(playerRef.current.currentTime()); // Save the current video time
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  const currentModule = trainingData[currentModuleIndex];
  const totalModules = trainingData.length;
  const completedPercentage = (trainingData.reduce((acc, module) => acc + (module.isComplete ? 1 : 0), 0) / totalModules) * 100;

  const isCurrentModuleComplete = currentModule?.isComplete;

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (trainingData.length === 0) {
    return <div className="flex justify-center items-center h-screen">No training modules available.</div>;
  }

  return (
    <div>
      <HomeNavbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="relative mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Module {currentModuleIndex + 1} of {totalModules}</h1>
          <p className="text-gray-500">Completion: {Math.round(completedPercentage)}%</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{currentModule.moduleName}</h2>
            <p className="text-gray-600 mb-4">{currentModule.summary}</p>
            <p className="text-gray-600 mb-2"><strong>Status:</strong> {currentModule.isComplete ? 'Completed' : 'In Progress'}</p>
          </div>

          <div className="lg:w-1/3 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{currentModule.moduleName} - Video</h2>
            <div ref={videoContainerRef} className="w-full h-auto rounded-lg"></div>
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
            disabled={!isCurrentModuleComplete || currentModuleIndex === totalModules - 1}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${!isCurrentModuleComplete || currentModuleIndex === totalModules - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingContent;
