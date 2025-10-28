import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaIdCard, FaGraduationCap, FaUserTie, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import StudentNavbar from '../components/StudentNavbar';

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');

  // Get student data from localStorage or URL params
  const getStudentCredentials = () => {
    // Try to get from localStorage first (if student is logged in)
    const storedStudent = localStorage.getItem('studentData');
    if (storedStudent) {
      return JSON.parse(storedStudent);
    }
    
    // Try to get from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const password = urlParams.get('password');
    const universityCode = urlParams.get('universityCode');
    
    if (email && password) {
      return { email, password, universityCode };
    }
    
    return null;
  };

  // Fetch student data from API
  const fetchStudentData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const credentials = getStudentCredentials();
      
      if (!credentials) {
        setError('Student credentials not found. Please login first.');
        return;
      }

      // If we have stored student data, use it
      if (credentials._id) {
        setStudentData(credentials);
        setLoading(false);
        return;
      }

      // Otherwise, fetch from API using email/password
      const queryParams = new URLSearchParams({
        email: credentials.email,
        password: credentials.password
      });
      
      if (credentials.universityCode) {
        queryParams.append('universityCode', credentials.universityCode);
      }

      // Try the direct email/password search endpoint first
      const response = await fetch(`http://localhost:5001/api/students/search?${queryParams}`);
      const result = await response.json();

      if (result.success && result.data) {
        // Handle both single object and array responses
        const student = Array.isArray(result.data) ? result.data[0] : result.data;
        if (student) {
          setStudentData(student);
          localStorage.setItem('studentData', JSON.stringify(student));
        } else {
          setError('Student data not found');
        }
      } else {
        setError(result.message || 'Student not found');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
      setError('Failed to fetch student data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  // Refresh function
  const handleRefresh = () => {
    fetchStudentData();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: FaUser },
    { id: 'academic', label: 'Academic Info', icon: FaGraduationCap },
    { id: 'contact', label: 'Contact Info', icon: FaPhone },
    { id: 'guardian', label: 'Guardian Info', icon: FaUserTie }
  ];

  // Loading state
  if (loading) {
    return (
      <>
        <StudentNavbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <FaSpinner className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading student profile...</p>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <StudentNavbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <FaExclamationTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Profile</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.href = '/student-login'}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // No student data
  if (!studentData) {
    return (
      <>
        <StudentNavbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <FaUser className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-yellow-800 mb-2">No Profile Found</h2>
              <p className="text-yellow-600 mb-4">Student profile not found. Please contact administration.</p>
              <button
                onClick={() => window.location.href = '/student-login'}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <StudentNavbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-lg border border-blue-100 p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="relative">
                  {studentData.image ? (
                    <img 
                      src={`http://localhost:5001/public/Uploads/${studentData.image}`} 
                      alt={studentData.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 border-4 border-blue-500 shadow-lg ${studentData.image ? 'hidden' : 'flex'}`}>
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&auto=format" 
                      alt="Default Student Avatar"
                      className="w-20 h-20 rounded-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-20 h-20 rounded-full flex items-center justify-center bg-blue-500 text-white font-bold text-xl hidden">
                      {studentData.name ? studentData.name.charAt(0).toUpperCase() : 'S'}
                    </div>
                  </div>
                  <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white shadow-md ${
                    studentData.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{studentData.name}</h1>
                  <p className="text-xl text-blue-600 font-semibold mb-1">{studentData.course_id.courseName}</p>
                  <p className="text-lg text-gray-600 mb-3">{studentData.year} • {studentData.department}</p>
                  <div className="flex items-center justify-center md:justify-start space-x-3">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md ${
                      studentData.status === 'active' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {studentData.status.toUpperCase()}
                    </span>
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold border border-blue-200">
                      Enrollment: {studentData.enrollmentId}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <FaSpinner className="w-4 h-4" />
                  <span className="font-medium">Refresh</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <FaIdCard className="w-4 h-4" />
                  <span className="font-medium">Print Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-5 px-2 border-b-3 font-semibold text-sm flex items-center space-x-3 transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-8">
              {/* Personal Information */}
              {activeTab === 'personal' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="p-3 bg-blue-500 rounded-full">
                        <FaUser className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Full Name</p>
                        <p className="font-bold text-gray-900 text-lg">{studentData.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="p-3 bg-green-500 rounded-full">
                        <FaIdCard className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Enrollment ID</p>
                        <p className="font-bold text-gray-900 text-lg">{studentData.enrollmentId}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="p-3 bg-purple-500 rounded-full">
                        <FaCalendarAlt className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Date of Birth</p>
                        <p className="font-bold text-gray-900 text-lg">{formatDate(studentData.DateOfBirth)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="p-3 bg-orange-500 rounded-full">
                        <FaUser className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Gender</p>
                        <p className="font-bold text-gray-900 text-lg">{studentData.Gender}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                      <div className="p-3 bg-indigo-500 rounded-full">
                        <FaIdCard className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Aadhar Number</p>
                        <p className="font-bold text-gray-900 text-lg">{studentData.aadharNo}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-teal-50 rounded-lg border border-teal-100">
                      <div className="p-3 bg-teal-500 rounded-full">
                        <FaIdCard className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">University Code</p>
                        <p className="font-bold text-gray-900 text-lg">{studentData.universityCode}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-pink-50 rounded-lg border border-pink-100">
                      <div className="p-3 bg-pink-500 rounded-full">
                        <FaCalendarAlt className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Joining Date</p>
                        <p className="font-bold text-gray-900 text-lg">{formatDate(studentData.JoiningDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="p-3 bg-gray-500 rounded-full">
                        <FaMapMarkerAlt className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Address</p>
                        <p className="font-bold text-gray-900 text-lg whitespace-pre-line">{studentData.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Academic Information */}
              {activeTab === 'academic' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FaGraduationCap className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Course Name</p>
                        <p className="font-semibold">{studentData.course_id.courseName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaIdCard className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Course Code</p>
                        <p className="font-semibold">{studentData.course_id.courseCode}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaUser className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="font-semibold">{studentData.course_id.department}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FaCalendarAlt className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Current Year</p>
                        <p className="font-semibold">{studentData.year}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaGraduationCap className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Semester</p>
                        <p className="font-semibold">{studentData.course_id.semester}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaCalendarAlt className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Course Duration</p>
                        <p className="font-semibold">{studentData.course_id.duration} years</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              {activeTab === 'contact' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FaEnvelope className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-semibold">{studentData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaPhone className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-semibold">{studentData.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FaExclamationTriangle className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Emergency Contact</p>
                        <p className="font-semibold">{studentData.emergencyContact}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaMapMarkerAlt className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-semibold whitespace-pre-line">{studentData.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Guardian Information */}
              {activeTab === 'guardian' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FaUserTie className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Guardian Name</p>
                        <p className="font-semibold">{studentData.guardianName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaPhone className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Guardian Phone</p>
                        <p className="font-semibold">{studentData.guardianPhone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FaExclamationTriangle className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Emergency Contact</p>
                        <p className="font-semibold">{studentData.emergencyContact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Fee Information */}
          <div className="bg-gradient-to-r from-white to-green-50 rounded-xl shadow-lg border border-green-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FaGraduationCap className="text-green-600 mr-3" />
              Fee Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between mb-3">
                  <FaGraduationCap className="text-blue-600 text-2xl" />
                  <span className="text-sm text-blue-600 font-semibold">Course Fee</span>
                </div>
                <p className="text-3xl font-bold text-blue-700">₹{studentData.course_id.price}</p>
                <p className="text-sm text-blue-600 mt-1">Total Course Amount</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between mb-3">
                  <FaIdCard className="text-green-600 text-2xl" />
                  <span className="text-sm text-green-600 font-semibold">Discount</span>
                </div>
                <p className="text-3xl font-bold text-green-700">₹{studentData.course_id.discountPrice}</p>
                <p className="text-sm text-green-600 mt-1">Scholarship Amount</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between mb-3">
                  <FaUser className="text-purple-600 text-2xl" />
                  <span className="text-sm text-purple-600 font-semibold">Final Amount</span>
                </div>
                <p className="text-3xl font-bold text-purple-700">₹{studentData.final_amount}</p>
                <p className="text-sm text-purple-600 mt-1">Amount to Pay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;