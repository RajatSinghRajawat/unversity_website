import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import StudentLogin from './pages/StudentLogin';
import StudentHome from './pages/StudentHome';
import StudentResult from './pages/StudentResult';
import StudentAdmitCard from './pages/StudentAdmitCard';
import StudentMessage from './pages/StudentMessage';
import StudentProfile from './pages/StudentProfile';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('studentLoggedIn') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/student/login" replace />;
  }
  
  return children;
};

// Public Layout (with Navbar and Footer)
const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

// Student Layout (without public Navbar and Footer)
const StudentLayout = ({ children }) => {
  return <>{children}</>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        {/* Student Login (public) */}
        <Route path="/student/login" element={<StudentLogin />} />

        {/* Protected Student Routes */}
        <Route
          path="/student/home"
          element={
            <ProtectedRoute>
              <StudentLayout>
                <StudentHome />
              </StudentLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/results"
          element={
            <ProtectedRoute>
              <StudentLayout>
                <StudentResult />
              </StudentLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/admit-card"
          element={
            <ProtectedRoute>
              <StudentLayout>
                <StudentAdmitCard />
              </StudentLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/messages"
          element={
            <ProtectedRoute>
              <StudentLayout>
                <StudentMessage />
              </StudentLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute>
              <StudentLayout>
                <StudentProfile />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        {/* Redirect /student to login or home based on auth */}
        <Route
          path="/student"
          element={
            localStorage.getItem('studentLoggedIn') === 'true' ? (
              <Navigate to="/student/home" replace />
            ) : (
              <Navigate to="/student/login" replace />
            )
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
