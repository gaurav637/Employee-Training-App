# TrainingHub

**TrainingHub** This project involves developing a full stack software application that offers an interactive training module for employees. The training module provides employees with a structured approach to completing training videos while maintaining control over progress and video playback behavior. The application consists of a video library, enforces sequential playback, allows users to resume videos from where they last stopped, supports back navigation, and tracks progress as a percentage.

## Installation and Setup

Follow the steps below to set up and run the project locally:

### Prerequisites

  Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)


   1. **Clone the Repository**:

      ```
        git clone https://github.com/your-username/trainingpage.git
      ```

   2. **Navigate to the Project Directory**:
      
      ```
       cd TrainingHub
      ```
      
   4. **Install Backend Dependencies**:

      ```
       cd server
       npm install
      ```

   4. **Install Frontend Dependencies**:

      ```
       cd ../client
       npm install
      ```   

  5. **Set Up Environment Variables**:

      Create a .env file in the backend directory with the following content:
    
    ```
      PORT=4040
      MONGO_URI=mongodb://localhost:27017/DataBase_name
      SECRET_KEY=your_jwt_secret
      FRONTEND_URL=http://localhost:5000.
    ```
  6. **Run the Backend**:
     
     ```
      cd backend
      npm start
     ```
  8. **Run the Frontend**:

     Open a new terminal and run:
     ```
      cd frontend
      npm start
     ```

## TrainingHub Features

1. **Video Library**: 
   - A collection of video topics, each containing a unique video file.
   
2. **Sequential Video Playback**: 
   - Employees must watch videos in the specified order without any option to fast forward or skip ahead.
   - Ensures training is completed as intended by the organization(TrainingHub).

3. **Resume from Last Stop**: 
   - If a video stops playing at a particular timeline position, it will resume from that exact point on the next visit.
   - Enhances user experience by saving the last playback position.

4. **Back Navigation**: 
   - Users can navigate back to previously watched videos but cannot fast-forward past the current video.
   - Allows review of content without compromising the sequence enforcement.

5. **Progress Tracking**: 
   - Displays the employee's progress as a percentage completed on the dashboard.
   - Provides a visual indicator to motivate employees and keep track of their training completion.

6. **Authentication and Authorization (JWT)**: 
   - Secure user login and access control using JSON Web Tokens (JWT).
   - Ensures only authenticated users can access and interact with the platform.

7. **Profile Page**: 
   - Users can view and manage their personal details, update preferences, and see their training progress.

8. **About Page**: 
   - Provides details about the application, its purpose, and how it benefits employees and organizations.
   - Gives an overview of the platform and key information about its development.

   
## Technical Stack and Framework Choices

### Frontend:

- HTML5 and JavaScript: Core structure and interactivity.
- React.js: For building a dynamic and modular user interface.
- React Router: For handling navigation between video modules and ensuring a smooth user experience.
- Video.js: For seamless video playback with built-in controls and customization features.
- Tailwind CSS: For efficient and responsive styling of the UI.
- 
### Backend:

- Node.js with Express.js: To handle API requests, routing, and business logic.
- MongoDB: A NoSQL database used to store video metadata, user progress, and other relevant information.
- Jwt: Authentication and Authorization




## Contributing
  Contributions are welcome! If you have suggestions or improvements, please follow these steps:

- Fork the repository.
- Create a new branch ```git checkout -b feature```
- Commit your changes ```git commit -m 'Add some feature```
- Push to the branch ```git push origin feature```
- Create a new Pull Request.

## Contact
  For any inquiries, please contact:

- Author: Gaurav Negi
- Email: negigaurav637@gmail.com
- GitHub: [Profile](https://github.com/gaurav637)
- LinkedIn: 

  
Feel free to adjust the details to better match your project and personal information.
