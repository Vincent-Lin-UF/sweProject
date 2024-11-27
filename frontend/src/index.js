import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Root from './routes/Root';
import ErrorPage from './Error';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import WorkoutTracker from './pages/WorkoutTracker'; 

import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "login/",
                element: <Login />
            },
            {
                path: "profile/",
                element: <Profile />
            },
            {
                path: "signup/",
                element: <Signup />
            },
            {
                path: "workouts/",
                element: <WorkoutTracker />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();
