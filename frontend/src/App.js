import React, {useEffect, useState} from 'react';
import Layout from "./components/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import WorkoutTracker from "./pages/WorkoutTracker";
import ErrorPage from "./Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + '/api/users/status', {
          credentials: 'include', // Include cookies/session info
        });
        const data = await response.json();
        console.log(data);

        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="workouts" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <WorkoutTracker />
            </ProtectedRoute>
          } />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;