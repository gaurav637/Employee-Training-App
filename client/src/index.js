import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {RouterProvider,Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Login from './pages/login/Login';
import SignUp from './pages/singup/Signup';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile'
import About from './pages/about/About';
import Training from './pages/training/Training';
import TrainingModule from './pages/TrainingModules/TrainingContent';

// routes

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/'>
      <Route  path='/' element={<App/>} ></Route>

      <Route path='/signup'  element={<SignUp/>} />
      <Route path='/login'  element={<Login/>} />
      <Route path='/home'   element={<Home/>} />
      <Route path='/profile'   element={<Profile/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/training' element={<Training/>} />
      <Route path='/module/:id' element={<TrainingModule/>} />
    </Route>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <RouterProvider router={router} />
);


