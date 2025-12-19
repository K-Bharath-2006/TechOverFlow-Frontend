import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './Pages/Home';
import About from './Pages/About';
import Question from './Pages/Question';
import MyQuestions from './Pages/MyQuestions';
import AdminHome from './Pages/AdminHome';
import AdminReports from './Pages/AdminReports';
import AddReport from './Pages/AddReport';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import ProtectedRoute, { AdminRoute } from './Pages/ProtectedRoute';
import QuestionForm from './Pages/QuestionForm';



const routerVariables = createBrowserRouter([
  {
    path:"/",
    element : <App />,
    children : [
      {
        path : "/",
        element : <Home />,
      },
      {
        path:"/about",
        element:<About />,
      },
      {
        path:"/login",
        element:<Login />,
      },
      {
        path:"/register",
        element:<Register />,
      },
      {
        path:"/question/:id",
        element:<Question />,
      },
      {
        path:"/my-questions",
        element :<ProtectedRoute> <MyQuestions /> </ProtectedRoute>,
      },
      {
        path:"/admin-home",
        element :<AdminRoute> <AdminHome /> </AdminRoute>,
      },
      {
        path:"/admin-reports",
        element : <AdminReports />,
      },
      {
        path:"/add-report",
        element : <AddReport />,
      },
      {
        path:"/profile/:userName",
        element : <Profile />,
      },
      {
        path:"/add-question",
        element :<ProtectedRoute> <QuestionForm /> </ProtectedRoute>,
      },
      {
        path:"*",
        element: <h1>Page Not Found ... Please check the url</h1>
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {routerVariables} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
