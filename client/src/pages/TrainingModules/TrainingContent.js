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
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const playerRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [enableNext, setEnableNext] = useState(false);

  useEffect(() => {
    if (videoTime === videoDuration && videoDuration > 0) {
      setEnableNext(true);
    }
  }, [videoTime, videoDuration]);

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/training/get-modules/${id}`);
        setTrainingData(response.data.module || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchTrainingData();
  }, [id]);

  useEffect(() => {
    if (trainingData.length > 0) {
      const videoElement = document.createElement('video');
      videoElement.className = 'video-js vjs-default-skin';
      videoElement.setAttribute('playsinline', 'true');
      const videoContainer = videoContainerRef.current;
      if (videoContainer) {
        videoContainer.innerHTML = '';
        videoContainer.appendChild(videoElement);
      }

      const videoUrl = 'https://shorturl.at/i9JBr';

      const player = videojs(videoElement, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        fluid: true,
        sources: [{ src: videoUrl, type: 'video/mp4' }],
      });

      playerRef.current = player;

      player.on('loadedmetadata', () => {
        setVideoDuration(player.duration());
      });

      player.on('timeupdate', () => {
        setVideoTime(player.currentTime());
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
      playerRef.current.currentTime(videoTime);
    }
  }, [videoTime]);

  const handleNext = async () => {
    if (currentModuleIndex < trainingData.length - 1) {
      setVideoTime(playerRef.current.currentTime());
      setCurrentModuleIndex(currentModuleIndex + 1);

      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/training/update-module/${id}`, {
          moduleId: trainingData[currentModuleIndex]._id,
          isComplete: true,
        });
      } catch (error) {
        console.error('Error updating module completion:', error);
      }

      setEnableNext(false);
    }
  };

  const handlePrevious = () => {
    if (currentModuleIndex > 0) {
      setVideoTime(playerRef.current.currentTime());
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  const currentModule = trainingData[currentModuleIndex];
  const totalModules = trainingData.length;
  const completedPercentage = (trainingData.reduce((acc, module) => acc + (module.isComplete ? 1 : 0), 0) / totalModules) * 100;

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (trainingData.length === 0) {
    return <div className="flex justify-center items-center h-screen">No training modules available.</div>;
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <HomeNavbar />
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/3 p-4">
          <div className="video-container" ref={videoContainerRef}></div>
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={handlePrevious}
              disabled={currentModuleIndex === 0}
            >
              Previous
            </button>
            <span>Module {currentModuleIndex + 1} of {totalModules}</span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleNext}
              disabled={!enableNext}
            >
              Next
            </button>
          </div>
          <div className="mt-4">
            <span className="font-bold">Completion:</span> {completedPercentage.toFixed(2)}%
          </div>
        </div>

        <div className="lg:w-1/3 p-4">
          <h2 className="text-xl font-bold">{currentModule ? currentModule.moduleName : ''}</h2>
          <p>{currentModule ? currentModule.summary : ''}</p>
        </div>
      </div>
    </div>
  );
};

export default TrainingContent;
