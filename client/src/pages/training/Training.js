import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeNavbar from '../../components/HomeNavbar';
import { useNavigate } from 'react-router-dom';

const TrainingPage = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/training/get-all`);
        const trainingsData = response.data.training;
        setTrainings(Array.isArray(trainingsData) ? trainingsData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching training data:', error);
        setTrainings([]);
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  const handleEnroll = (trainingId) => {
    navigate(`/module/${trainingId}`); 
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div>
      <HomeNavbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Training Types</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainings.map((training) => (
            <div
              key={training._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{training.title}</h2>
              <p className="text-gray-600 mb-2"><strong>Category:</strong> {training.category}</p>
              <p className="text-gray-600 mb-2"><strong>Instructor:</strong> {training.instructor}</p>
              <p className="text-gray-600 mb-2"><strong>Start Date:</strong> {new Date(training.startDate).toLocaleDateString()}</p>
              <p className="text-gray-600 mb-2"><strong>End Date:</strong> {new Date(training.endDate).toLocaleDateString()}</p>
              <p className="text-gray-600 mb-4">{training.description}</p>
              
              <button
                onClick={() => handleEnroll(training._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
