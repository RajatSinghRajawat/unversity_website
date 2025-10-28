import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaClock, FaCalendar } from 'react-icons/fa';
import StudentNavbar from '../components/StudentNavbar';
import {
  DEMO_STUDENT,
  DASHBOARD_CARDS,
  QUICK_LINKS,
  RECENT_ACTIVITIES,
  UPCOMING_EVENTS
} from '../constants/studentData';

const StudentHome = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNavbar />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                Welcome back, {DEMO_STUDENT.name}! 👋
              </h1>
              <p className="text-blue-100 text-sm sm:text-base lg:text-lg">{DEMO_STUDENT.course}</p>
              <p className="text-blue-200 text-xs sm:text-sm">
                {DEMO_STUDENT.enrollmentNo} | {DEMO_STUDENT.semester}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{DEMO_STUDENT.batch.split('-')[0]}</p>
                <p className="text-xs text-blue-200">Batch Start</p>
              </div>
              <div className="h-8 sm:h-12 w-px bg-blue-400"></div>
              <div className="text-center">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{DEMO_STUDENT.batch.split('-')[1]}</p>
                <p className="text-xs text-blue-200">Expected End</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {DASHBOARD_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`${card.color} text-white p-2 sm:p-3 rounded-lg text-xl sm:text-2xl`}>
                  {card.icon}
                </div>
                <div className="text-right">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">{card.value}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{card.description}</p>
                </div>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700">{card.title}</h3>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {QUICK_LINKS.map((link, index) => (
              <Link
                key={index}
                to={link.link}
                className="flex flex-col items-center p-3 sm:p-4 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                  {link.name}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Recent Activities</h2>
              <button className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {RECENT_ACTIVITIES.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 sm:w-10 h-8 sm:h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium text-sm sm:text-base">{activity.activity}</p>
                    <p className="text-xs sm:text-sm text-gray-500 flex items-center mt-1">
                      <FaClock className="mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Upcoming Events</h2>
            
            <div className="space-y-3 sm:space-y-4">
              {UPCOMING_EVENTS.map((event) => (
                <div
                  key={event.id}
                  className={`p-3 sm:p-4 rounded-lg border-l-4 ${
                    event.type === 'exam'
                      ? 'border-red-500 bg-red-50'
                      : event.type === 'assignment'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-blue-500 bg-blue-50'
                  }`}
                >
                  <p className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">{event.title}</p>
                  
                  <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-1">
                    <FaCalendar className="mr-2" />
                    {event.date}
                  </div>
                  
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <FaClock className="mr-2" />
                    {event.time}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-3 sm:mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm sm:text-base">
              View Calendar
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-2 sm:ml-3">
              <p className="text-xs sm:text-sm text-yellow-700">
                <strong>Important:</strong> End semester examinations will commence from 15th December 2024. 
                Download your admit card from the Admit Card section.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
