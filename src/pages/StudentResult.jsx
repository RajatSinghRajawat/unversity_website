import React, { useState } from 'react';
import { FaDownload, FaPrint, FaTrophy, FaChartLine } from 'react-icons/fa';
import StudentNavbar from '../components/StudentNavbar';
import { SAMPLE_RESULTS, DEMO_STUDENT } from '../constants/studentData';

const StudentResult = () => {
  const [selectedSemester, setSelectedSemester] = useState(SAMPLE_RESULTS[0]);

  const calculateOverallCGPA = () => {
    const totalSGPA = SAMPLE_RESULTS.reduce((sum, result) => sum + parseFloat(result.sgpa), 0);
    return (totalSGPA / SAMPLE_RESULTS.length).toFixed(2);
  };

  const handleDownload = () => {
    alert('Downloading result... (This is a demo)');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Academic Results</h1>
              <p className="text-gray-600">{DEMO_STUDENT.name}</p>
              <p className="text-sm text-gray-500">{DEMO_STUDENT.enrollmentNo} | {DEMO_STUDENT.course}</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaDownload className="mr-2" />
                Download
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaPrint className="mr-2" />
                Print
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <FaTrophy className="text-4xl opacity-80" />
              <div className="text-right">
                <p className="text-4xl font-bold">{calculateOverallCGPA()}</p>
                <p className="text-green-100">Overall CGPA</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-green-400">
              <p className="text-sm">Outstanding Performance! 🎉</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <FaChartLine className="text-4xl opacity-80" />
              <div className="text-right">
                <p className="text-4xl font-bold">{SAMPLE_RESULTS.length}</p>
                <p className="text-blue-100">Semesters Completed</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-400">
              <p className="text-sm">Keep up the great work! 📚</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-4xl opacity-80">🎓</span>
              <div className="text-right">
                <p className="text-4xl font-bold">A+</p>
                <p className="text-purple-100">Average Grade</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-purple-400">
              <p className="text-sm">Excellent Academic Record! 🌟</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Select Semester</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SAMPLE_RESULTS.map((result) => (
              <button
                key={result.id}
                onClick={() => setSelectedSemester(result)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedSemester.id === result.id
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <p className="font-semibold text-gray-800">{result.semester}</p>
                <p className="text-sm text-gray-600">SGPA: {result.sgpa}</p>
                <span
                  className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                    result.status === 'Pass'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {result.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-900 text-white p-6">
            <h2 className="text-2xl font-bold">{selectedSemester.semester} Results</h2>
            <p className="text-blue-200 mt-1">SGPA: {selectedSemester.sgpa} | Status: {selectedSemester.status}</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">S.No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subject Name</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Marks Obtained</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Max Marks</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Grade</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedSemester.subjects.map((subject, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{subject.name}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700">{subject.marks}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700">100</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        subject.grade === 'A+' ? 'bg-green-100 text-green-700' :
                        subject.grade === 'A' ? 'bg-blue-100 text-blue-700' :
                        subject.grade === 'B+' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {subject.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                        Pass
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-sm font-bold text-gray-800">
                    Total / Average
                  </td>
                  <td className="px-6 py-4 text-sm text-center font-bold text-gray-800">
                    {selectedSemester.subjects.reduce((sum, s) => sum + s.marks, 0)}
                  </td>
                  <td className="px-6 py-4 text-sm text-center font-bold text-gray-800">
                    {selectedSemester.subjects.length * 100}
                  </td>
                  <td className="px-6 py-4 text-sm text-center font-bold text-gray-800">
                    SGPA: {selectedSemester.sgpa}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-700">
                      {selectedSemester.status}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Grade Scale:</h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="text-gray-600"><strong>A+:</strong> 90-100</span>
              <span className="text-gray-600"><strong>A:</strong> 80-89</span>
              <span className="text-gray-600"><strong>B+:</strong> 70-79</span>
              <span className="text-gray-600"><strong>B:</strong> 60-69</span>
              <span className="text-gray-600"><strong>C:</strong> 50-59</span>
              <span className="text-gray-600"><strong>F:</strong> Below 50</span>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> These results are subject to verification. For any discrepancies, 
            please contact the examination department within 7 days of result declaration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentResult;
