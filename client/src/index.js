import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {RouterProvider,Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Login from './pages/login/Login';
import SignUp from './pages/singup/Signup';




const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/'>
      <Route  path='/' element={<App/>} ></Route>

      <Route path='/signup'  element={<SignUp/>} />
      <Route path='/login'  element={<Login/>} />
      <Route path=''   ></Route>

    </Route>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <RouterProvider router={router} />
);


