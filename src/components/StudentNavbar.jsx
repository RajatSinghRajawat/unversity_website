import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaGraduationCap, 
  FaIdCard, 
  FaEnvelope, 
  FaUser, 
  FaBars, 
  FaTimes,
  FaSignOutAlt,
  FaBell
} from 'react-icons/fa';
import { DEMO_STUDENT } from '../constants/studentData';

const StudentNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('studentLoggedIn');
    localStorage.removeItem('studentEnrollment');
    localStorage.removeItem('studentData');
    navigate('/student/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/student/home', icon: FaHome },
    { name: 'Results', path: '/student/results', icon: FaGraduationCap },
    { name: 'Admit Card', path: '/student/admit-card', icon: FaIdCard },
    { name: 'Messages', path: '/student/messages', icon: FaEnvelope },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <img
              src="/kishangarh-logo.svg"
              alt="Kishangarh Girls College Logo"
              className="h-8 sm:h-10"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold">Student Portal</h1>
              <p className="text-xs text-blue-200">Welcome, {DEMO_STUDENT.name}</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                }`}
              >
                <item.icon className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
            <button className="relative p-1 sm:p-2 rounded-full hover:bg-blue-800 transition-colors">
              <FaBell className="h-4 sm:h-5 w-4 sm:w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-blue-900"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 rounded-md hover:bg-blue-800 transition-colors"
              >
                <div className="h-6 sm:h-8 w-6 sm:w-8 rounded-full bg-blue-700 flex items-center justify-center">
                  <FaUser className="text-xs sm:text-sm" />
                </div>
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">{DEMO_STUDENT.name.split(' ')[0]}</span>
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-3 sm:px-4 py-2 border-b border-gray-200">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{DEMO_STUDENT.name}</p>
                    <p className="text-xs text-gray-500">{DEMO_STUDENT.enrollmentNo}</p>
                  </div>
                  <Link
                    to="/student/profile"
                    className="block px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileDropdown(false)}
                  >
                    <FaUser className="inline mr-2" />
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="inline mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 sm:p-2 rounded-md hover:bg-blue-800"
          >
            {mobileMenuOpen ? <FaTimes className="h-5 sm:h-6 w-5 sm:w-6" /> : <FaBars className="h-5 sm:h-6 w-5 sm:w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-3 py-2 border-b border-blue-700 mb-2">
              <p className="text-sm text-blue-200">Welcome, {DEMO_STUDENT.name}</p>
              <p className="text-xs text-blue-300">{DEMO_STUDENT.enrollmentNo}</p>
            </div>
            
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center px-3 py-2 rounded-md text-sm sm:text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                <item.icon className="mr-3" />
                {item.name}
              </Link>
            ))}
            
            <Link
              to="/student/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-2 rounded-md text-sm sm:text-base font-medium text-blue-100 hover:bg-blue-700 hover:text-white"
            >
              <FaUser className="mr-3" />
              Profile
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 rounded-md text-sm sm:text-base font-medium text-red-200 hover:bg-blue-700 hover:text-white"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default StudentNavbar;
