import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import ViewTasks from './pages/ViewTasks';
import StudyArea from './pages/StudyArea';
import Reviews from './pages/Reviews';
import Viewreviews from './pages/Viewreviews';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // You can update isLoggedIn using props in Login component on successful login

  return (
    <BrowserRouter>
      {/* Show navbar only after login */}
      {isLoggedIn && <Navbar />}
      
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* Private routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addtask"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AddTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewtasks"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ViewTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studyarea"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <StudyArea />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Reviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewreviews"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Viewreviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
