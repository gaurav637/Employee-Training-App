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
       cd EmployeeTraining
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

## API Endpoints


#### Employee Routes

1. **Register a New Employee**
   - **Endpoint:** `POST /signup`
   - **Description:** Registers a new employee.
   - **Request Body:**
     ```json
     {
       "name": "Gaurav Negi",
       "email": "gaurav@gmail.com",
       "password": "gaurav8921",
     }
     ```
   - **Response:**
     - 201 Created
       ```json
       {
         "id": "employeeId",
         "name": "Employee Name",
         "email": "employee@example.com",
         "position": "Employee Position"
       }
       ```
     - 500 Internal Server Error
       ```json
       {
         "error": "Failed to register new employee: Error Message"
       }
       ```

2. **Login Employee**
   - **Endpoint:** `POST /login`
   - **Description:** Logs in an employee and returns a JWT token.
   - **Request Body:**
     ```json
     {
       "email": "gaurav@gmail.com",
       "password": "gaurav8921"
     }
     ```
   - **Response:**
     - 200 OK
       ```json
       {
         "token": "jwtToken"
       }
       ```
     - 401 Unauthorized
       ```json
       {
         "error": "Invalid email or password"
       }
       ```

3. **Get Employee Profile**
   - **Endpoint:** `GET /profile`
   - **Description:** Retrieves the profile of the logged-in employee.
   - **Request Headers:**
     - `Authorization: Bearer <token>`
   - **Response:**
     - 200 OK
       ```json
       {
         "id": "employeeId",
         "name": "Employee Name",
         "email": "employee@example.com",
       }
       ```
     - 401 Unauthorized
       ```json
       {
         "error": "Unauthorized access"
       }
       ```

#### Training Routes

  1. **Create a New Training**
   - **Endpoint:** `POST /create`
   - **Description:** Creates a new training session.
   - **Request Body:**
     ```json
     {
       "title": "Mastering LinkedIn Profile Optimization for Professional Growth",
       "description": "This comprehensive course provides strategies and best practices for optimizing your LinkedIn profile.",
       "category": "Professional Development",
       "startDate": "2024-11-01T00:00:00Z",
       "endDate": "2024-11-30T23:59:59Z",
       "instructor": "Sarah Thompson",
       "maxParticipants": 100,
       "moduleContent": [
         {
           "moduleName": "Building a Strong LinkedIn Profile",
           "summary": "This module focuses on setting up a strong LinkedIn profile, covering:\n\n1. **Profile Picture**\n2. **Headline**\n3. **Summary**\n4. **Experience and Skills**",
           "video": "http://localhost:433/dsdk",
           "isComplete": false,
           "complete": 0
         }
       ]
     }
     ```
   
   - **Response:**
     - 201 Created
       ```json
       {
         "id": "trainingId",
         "title": "Mastering LinkedIn Profile Optimization for Professional Growth",
         "description": "This comprehensive course provides strategies and best practices for optimizing your LinkedIn profile.",
         "category": "Professional Development",
         "startDate": "2024-11-01T00:00:00Z",
         "endDate": "2024-11-30T23:59:59Z",
         "instructor": "Sarah Thompson",
         "maxParticipants": 100,
         "moduleContent": [
           {
             "moduleName": "Building a Strong LinkedIn Profile",
             "summary": "This module focuses on setting up a strong LinkedIn profile, covering:\n\n1. **Profile Picture**\n2. **Headline**\n3. **Summary**\n4. **Experience and Skills**",
             "video": "http://localhost:433/dsdk",
             "isComplete": false,
             "complete": 0
           }
         ]
       }
       ```
     - 500 Internal Server Error
       ```json
       {
         "error": "Failed to create new training: Error Message"
       }
       ```


2. **Get All Trainings**
   - **Endpoint:** `GET /get-all`
   - **Description:** Retrieves a list of all training sessions.
   - **Response:**
     - 200 OK
       ```json
       [
         {
           "id": "trainingId1",
           "title": "Training Title 1",
           "description": "Training Description 1",
           "duration": 90,
           "category": "Category 1"
         },
         {
           "id": "trainingId2",
           "title": "Training Title 2",
           "description": "Training Description 2",
           "duration": 60,
           "category": "Category 2"
         }
       ]
       ```
     - 500 Internal Server Error
       ```json
       {
         "error": "Failed to retrieve trainings: Error Message"
       }
       ```

3. **Search Trainings**
   - **Endpoint:** `POST /search`
   - **Description:** Searches for training sessions based on the specified criteria.
   - **Request Body:**
     ```json
     {
       "query": "Search Term",
       "filters": {
         "category": "Category",
         "duration": { "min": 30, "max": 120 }
       }
     }
     ```
   - **Response:**
     - 200 OK
       ```json
       [
         {
           "id": "trainingId1",
           "title": "Training Title 1",
           "description": "Training Description 1",
           "duration": 90,
           "category": "Category 1"
         }
       ]
       ```
     - 400 Bad Request
       ```json
       {
         "error": "Invalid search criteria"
       }
       ```

4. **Get Training Modules**
   - **Endpoint:** `GET /get-modules/:id`
   - **Description:** Retrieves the modules for a specific training session.
   - **Parameters:**
     - `id`: The ID of the training session.
   - **Response:**
     - 200 OK
       ```json
       {
         "id": "trainingId",
         "title": "Training Title",
         "modules": [
           {
             "moduleId": "moduleId1",
             "moduleName": "Module 1",
             "duration": 30
           },
           {
             "moduleId": "moduleId2",
             "moduleName": "Module 2",
             "duration": 45
           }
         ]
       }
       ```
     - 404 Not Found
       ```json
       {
         "error": "Training not found"
       }
       ```



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
