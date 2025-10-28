import React, { useState, useEffect } from 'react';
import { FaDownload, FaPrint, FaCheckCircle, FaClock, FaMapMarkerAlt, FaCalendar, FaSpinner } from 'react-icons/fa';
import StudentNavbar from '../components/StudentNavbar';
import ApiService from '../services/api';

const StudentAdmitCard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [admitCards, setAdmitCards] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get student data from localStorage
  const getStudentData = () => {
    try {
      const studentData = localStorage.getItem('studentData');
      if (studentData) {
        const parsedData = JSON.parse(studentData);
        setStudentData(parsedData);
        return parsedData._id;
      }
      return null;
    } catch (error) {
      console.error('Error parsing student data:', error);
      setError('Error loading student data');
      return null;
    }
  };

  // Fetch admit cards with proper error handling
  const fetchAdmitCards = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const studentId = getStudentData();
      if (!studentId) {
        setError('Student data not found. Please login again.');
        setLoading(false);
        return;
      }

      console.log('🔍 Fetching admit cards for student:', studentId);
      
      const response = await fetch(`http://localhost:5001/api/admitcards/student/${studentId}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('📋 API Response:', result);

      if (result.success) {
        setAdmitCards(result.data);
        if (result.data && result.data.length > 0) {
          setSelectedCard(result.data[0]);
        }
        console.log('✅ Admit cards loaded successfully:', result.data.length);
      } else {
        setError(result.message || 'Failed to load admit cards');
      }
    } catch (error) {
      console.error('❌ Error fetching admit cards:', error);
      setError(`Failed to load admit cards: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


useEffect(() => {
  fetchAdmitCards();
}, []);
  // Handle download functionality
  const handleDownload = async () => {
    if (!selectedCard) return;
    
    try {
      // Generate PDF content
      const pdfContent = generatePDFContent(selectedCard, studentData);
      
      // Create and download PDF
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `admit_card_${selectedCard._id || 'card'}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      alert('Admit card downloaded successfully!');
    } catch (error) {
      console.error('Error downloading admit card:', error);
      alert('Error downloading admit card. Please try again.');
    }
  };

  // Handle print functionality
  const handlePrint = () => {
    window.print();
  };

  // Generate PDF content
  const generatePDFContent = (admitCard, student) => {
    return `
ADMIT CARD
Suresh Gyan Vihar University

Student Information:
- Name: ${student?.name || 'N/A'}
- Enrollment Number: ${student?.enrollmentId || 'N/A'}
- Course: ${admitCard?.course_id?.courseName || 'N/A'}
- Course Code: ${admitCard?.course_id?.courseCode || 'N/A'}
- Department: ${admitCard?.course_id?.department || 'N/A'}
- Semester: ${admitCard?.semester || 'N/A'}

Examination Details:
- Exam Type: ${admitCard?.exam_type || 'N/A'}
- Exam Center: ${admitCard?.exam_center || 'N/A'}
- Room Number: ${admitCard?.room_no || 'N/A'}
- Status: ${admitCard?.status || 'N/A'}
- University Code: ${admitCard?.universityCode || 'N/A'}

Subject Schedule:
${admitCard?.subjects?.map(subject => 
  `- ${subject.subjectName}: ${subject.examDate} (${subject.examStartTime} - ${subject.examEndTime}) Room: ${subject.roomNo || 'N/A'}`
).join('\n') || 'No subjects available'}

Generated on: ${new Date().toLocaleDateString()}

Controller of Examinations
Suresh Gyan Vihar University
    `;
  };

  // Retry function
  const handleRetry = () => {
    fetchAdmitCards();
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admit Cards</h1>
          <p className="text-gray-600">Download your examination admit cards</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mr-3" />
            <span className="text-lg text-gray-600">Loading admit cards...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
                 <button 
                   onClick={handleRetry}
                   className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                 >
                   Retry
                 </button>
              </div>
            </div>
          </div>
        ) : admitCards.length === 0 ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">No admit cards available for you at this time.</p>
                 <button 
                   onClick={handleRetry}
                   className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                 >
                   Refresh
                 </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Available Cards</h2>
                <div className="space-y-3">
                  {admitCards.map((card) => (
                    <button
                      key={card._id}
                      onClick={() => setSelectedCard(card)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedCard?._id === card._id
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 text-sm">{card.exam_type}</p>
                          <p className="text-xs text-gray-600 mt-1">Semester {card.semester}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {card.course_id?.courseName || 'N/A'}
                          </p>
                        </div>
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            card.status === 'Available' || card.status === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : card.status === 'Completed'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {card.status}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              {selectedCard ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
                    <div className="flex items-center justify-between mb-6">
                      <img
                        src="https://www.gyanvihar.org/uploads/sgvu_join_logo_dcc9e2280a.png"
                        alt="SGVU Logo"
                        className="h-16 bg-white p-2 rounded"
                      />
                      <div className="text-right">
                        <h2 className="text-2xl font-bold">ADMIT CARD</h2>
                        <p className="text-blue-200 text-sm">Suresh Gyan Vihar University</p>
                      </div>
                    </div>
                    <div className="border-t border-blue-400 pt-4">
                      <h3 className="text-xl font-bold mb-2">{selectedCard.exam_type}</h3>
                      <p className="text-blue-200">Semester {selectedCard.semester}</p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-start mb-8">
                      <div className="flex-shrink-0 mr-6">
                        <img
                          src={studentData?.profileImage || "https://via.placeholder.com/128x128?text=Student"}
                          alt="Student"
                          className="w-32 h-32 rounded-lg border-4 border-gray-200 object-cover"
                        />
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Student Name</p>
                          <p className="font-semibold text-gray-800">{studentData?.name || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Enrollment Number</p>
                          <p className="font-semibold text-gray-800">{studentData?.enrollmentId || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Course</p>
                          <p className="font-semibold text-gray-800">{selectedCard.course_id?.courseName || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Semester</p>
                          <p className="font-semibold text-gray-800">{selectedCard.semester}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Examination Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <FaMapMarkerAlt className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Exam Center</p>
                            <p className="font-semibold text-gray-800">{selectedCard.exam_center}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <FaMapMarkerAlt className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Room Number</p>
                            <p className="font-semibold text-gray-800">{selectedCard.room_no}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedCard.subjects && selectedCard.subjects.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Subject Schedule</h3>
                        <div className="space-y-3">
                          {selectedCard.subjects.map((subject, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                              <div className="flex items-center">
                                <FaCalendar className="text-blue-600 mr-3" />
                                <div>
                                  <p className="font-semibold text-gray-800">{subject.subjectName}</p>
                                  <p className="text-sm text-gray-600">{subject.examDate}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-600">{subject.examStartTime} - {subject.examEndTime}</p>
                                <p className="text-xs text-gray-500">Room: {subject.roomNo || 'N/A'}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        {selectedCard.status === 'Available' || selectedCard.status === 'Active' ? (
                          <>
                            <FaCheckCircle className="text-green-500 mr-2 text-xl" />
                            <span className="text-green-700 font-semibold">Admit Card Available</span>
                          </>
                        ) : selectedCard.status === 'Completed' ? (
                          <>
                            <FaCheckCircle className="text-blue-500 mr-2 text-xl" />
                            <span className="text-blue-700 font-semibold">Examination Completed</span>
                          </>
                        ) : (
                          <>
                            <FaClock className="text-gray-500 mr-2 text-xl" />
                            <span className="text-gray-600 font-semibold">Examination Pending</span>
                          </>
                        )}
                      </div>
                    </div>

                    {(selectedCard.status === 'Available' || selectedCard.status === 'Active') && (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={handleDownload}
                          className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                        >
                          <FaDownload className="mr-2" />
                          Download PDF
                        </button>
                        <button
                          onClick={handlePrint}
                          className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                        >
                          <FaPrint className="mr-2" />
                          Print
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-100 px-8 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <p>Controller of Examinations</p>
                      <p>Suresh Gyan Vihar University</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-600">Please select an admit card to view details.</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Need Help?</strong> If you face any issues downloading your admit card, 
            please contact the examination department at{' '}
            <a href="mailto:exams@gyanvihar.org" className="font-semibold underline">
              exams@gyanvihar.org
            </a>{' '}
            or call <strong>18003094545</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentAdmitCard;
