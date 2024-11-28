import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './Error';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import WorkoutTracker from './pages/WorkoutTracker'; 
import App from './App'


// import {
//     createBrowserRouter,
//     RouterProvider,
// } from 'react-router-dom';
//
// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App />,
//         errorElement: <ErrorPage />,
//         children: [
//             {
//                 path: "/",
//                 element: <Home />
//             },
//             {
//                 path: "login/",
//                 element: <Login />
//             },
//             {
//                 path: "signup/",
//                 element: <Signup />
//             },
//             {
//                 path: "workouts/",
//                 element: <WorkoutTracker />
//             }
//         ]
//     }
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/*<RouterProvider router={router} />*/}
        <App/>
    </React.StrictMode>
);

reportWebVitals();
