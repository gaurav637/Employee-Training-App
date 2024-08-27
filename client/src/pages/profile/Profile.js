import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeNavbar from '../../components/HomeNavbar';

const Profile = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/employee/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        setEmployeeData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employeeData) {
    return <div>Error loading profile data.</div>;
  }

  return (
    <div>
        <HomeNavbar />
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
       
       <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 max-w-lg w-full">
    
         <div className="flex justify-center mb-6">
           <img
             className="w-32 h-32 rounded-full border-4 border-blue-500"
             src="https://via.placeholder.com/150"
             alt="Profile"
           />
         </div>
 
         <div className="text-center mb-6">
           <h2 className="text-2xl font-semibold text-gray-800 mb-2">{employeeData.name}</h2>
           <p className="text-gray-600">{employeeData.email}</p>
           <p className="text-gray-500 text-sm">Joined on {new Date(employeeData.createdAt).toLocaleDateString()}</p>
         </div>
 
         {/* About Section */}
         <div className="mb-6">
           <h3 className="text-lg font-semibold text-gray-800 mb-3">Enrolled Trainings</h3>
           <ul className="text-gray-600 leading-relaxed">
             {employeeData.trainingsEnrolled.map((training) => (
               <li key={training._id} className="mb-2">
                 {training.title} - {training.category}
               </li>
             ))}
           </ul>
         </div>
 
         {/* Progress Section */}
         <div className="mb-6">
           <h3 className="text-lg font-semibold text-gray-800 mb-3">Progress</h3>
           <ul className="text-gray-600 leading-relaxed">
             {employeeData.progress.map((item) => (
               <li key={item.training._id} className="mb-2">
                 {item.training.title}: {item.completionPercentage}% ({item.status})
               </li>
             ))}
           </ul>
         </div>
       </div>
     </div>
    </div>
  );
};

export default Profile;
