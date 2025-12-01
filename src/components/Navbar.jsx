import React, { useState, useCallback, useEffect } from 'react';
import { FaChevronDown, FaBars, FaTimes, FaEnvelope, FaBell, FaUser, FaGraduationCap, FaBookOpen, FaHome, FaInfoCircle, FaUniversity, FaUsers, FaChartLine } from 'react-icons/fa';
import { useAccordion } from '../hooks/useAccordion';
import MobileAccordion from './navbar/MobileAccordion';
import MenuItem from './navbar/MenuItem';
import ApiService from '../services/api';
import {
  TOP_NAV_LINKS,
  ABOUT_US_MENU,
  ACADEMICS_MENU,
  CAMPUS_LIFE_MENU,
  ADMISSIONS_SCHOOLS,
  ADMISSION_BUTTONS
} from '../constants/data';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    unreadMessages: 0,
    totalMessages: 0,
    recentStudents: [],
    recentCourses: []
  });
  const [loading, setLoading] = useState(false);

  const accordionKeys = [
    'admissions', 'aboutUs', 'campusLife', 'academics',
    'aboutSgv', 'leadership', 'academicsSgv', 'disciplines',
    'campusSgv', 'studentLife', ...ADMISSIONS_SCHOOLS.map((_, i) => `school_${i}`)
  ];
  const [accordionStates, toggleAccordion, closeAllAccordions] = useAccordion(accordionKeys);

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false);
    closeAllAccordions();
  }, [closeAllAccordions]);

  // Load stats on component mount
  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const dashboardStats = await ApiService.getDashboardStats();
        
        setStats({
          totalStudents: dashboardStats.totalStudents,
          totalCourses: dashboardStats.totalCourses,
          unreadMessages: dashboardStats.unreadMessages,
          totalMessages: dashboardStats.totalMessages,
          recentStudents: dashboardStats.students.slice(0, 3),
          recentCourses: dashboardStats.courses.slice(0, 3)
        });
      } catch (error) {
        console.error('Error loading stats:', error);
        // Set fallback values
        setStats({
          totalStudents: 0,
          totalCourses: 0,
          unreadMessages: 0,
          totalMessages: 0,
          recentStudents: [],
          recentCourses: []
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadStats();
  }, []);


  const renderAdmissionsDropdown = () => {
    const col1 = ADMISSIONS_SCHOOLS.slice(0, 5);
    const col2 = ADMISSIONS_SCHOOLS.slice(5, 10);
    const col3 = ADMISSIONS_SCHOOLS.slice(10);

    return (
      <div className="absolute -translate-x-3/4 top-full hidden group-hover:block bg-white shadow-lg p-6 min-w-max z-10 w-[1200px] rounded-md border-t-4 border-blue-900">
        <div className="grid grid-cols-3 gap-4">
          {[col1, col2, col3].map((column, colIndex) => (
            <div key={colIndex}>
              {column.map((school) => (
                <React.Fragment key={school.title}>
                  <h5 className="font-bold mb-2 uppercase text-[#2358cc] text-base mt-4 first:mt-0">
                    {school.title}
                  </h5>
                  <ul>
                    {school.programs.map((program) => (
                      <MenuItem key={program} text={program} />
                    ))}
                  </ul>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-8 justify-start">
          {ADMISSION_BUTTONS.map((btn) => (
            <div
              key={btn.text}
              className={`${btn.color} text-white px-6 py-3 rounded-full hover:bg-blue-700 cursor-pointer flex items-center font-bold text-base shadow`}
            >
              <span>{btn.text}</span>
              <span className="ml-2">→</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMobileAdmissionsMenu = () => (
    <MobileAccordion
      title="Admissions"
      isOpen={accordionStates.admissions}
      onToggle={() => toggleAccordion('admissions')}
    >
      {ADMISSIONS_SCHOOLS.map((school, index) => (
        <MobileAccordion
          key={school.title}
          title={school.title}
          isOpen={accordionStates[`school_${index}`]}
          onToggle={() => toggleAccordion(`school_${index}`)}
        >
          {school.programs.map((program) => (
            <li key={program}>
              <span className="block px-2 py-1 hover:bg-blue-900 hover:text-white cursor-pointer">
                {program}
              </span>
            </li>
          ))}
        </MobileAccordion>
      ))}
    </MobileAccordion>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-3 px-2 sm:px-4 flex flex-col sm:flex-row flex-wrap justify-between items-center text-xs sm:text-sm gap-2 shadow-lg">
        <div className="flex items-center space-x-4">
          <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full font-bold cursor-pointer text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            📞 Contact: 9649107150
          </span>
          <div className="hidden sm:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
            <FaUser className="text-yellow-300" />
            <span className="text-yellow-300 font-semibold">{stats.totalStudents}+ Students</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 flex-wrap">
            <span className="text-white hover:text-yellow-300 transition-colors cursor-pointer text-xs sm:text-sm flex items-center">
            <FaEnvelope className="inline mr-1 text-yellow-300" /> kishangarhgirls@gmail.com, kishangarhlawcollege@gmail.com
          </span>
        </div>
        <nav className="hidden md:flex">
          <ul className="flex space-x-2 sm:space-x-4">
            {TOP_NAV_LINKS.map((txt) => (
              <li key={txt}>
                <span className="hover:text-yellow-300 transition-colors cursor-pointer text-xs sm:text-sm font-medium">{txt}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="py-3 sm:py-4 px-2 sm:px-4 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-blue-900 gap-4 sm:gap-0 shadow-sm">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              src="/kishangarh-logo.svg"
              alt="Kishangarh law college (CO-EDU) Logo"
              className="h-10 sm:h-12 cursor-pointer hover:scale-105 transition-transform duration-300"
            />
            <div className="hidden sm:block">
              <div className="text-blue-900 font-bold text-sm sm:text-base">
                Kishangarh law college (CO-EDU)
              </div>
              <div className="text-blue-700 text-xs sm:text-sm">
                Devta Road, Bambora (Kishangarh) Alwar
              </div>
            </div>
          </div>
          {/* <div className="hidden lg:flex items-center space-x-4 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-blue-200">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <FaUsers className="text-blue-600 text-sm" />
              </div>
              <div className="text-center">
                <div className="text-blue-900 font-bold text-lg">{loading ? '...' : stats.totalStudents}</div>
                <div className="text-blue-700 text-xs">Students</div>
              </div>
            </div>
            <div className="w-px h-8 bg-blue-300"></div>
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 p-2 rounded-full">
                <FaBookOpen className="text-green-600 text-sm" />
              </div>
              <div className="text-center">
                <div className="text-green-900 font-bold text-lg">{loading ? '...' : stats.totalCourses}</div>
                <div className="text-green-700 text-xs">Courses</div>
              </div>
            </div>
            <div className="w-px h-8 bg-blue-300"></div>
            <div className="flex items-center space-x-2">
              <div className="bg-orange-100 p-2 rounded-full">
                <FaBell className="text-orange-600 text-sm" />
              </div>
              <div className="text-center">
                <div className="text-orange-900 font-bold text-lg">{loading ? '...' : stats.unreadMessages}</div>
                <div className="text-orange-700 text-xs">New</div>
              </div>
            </div>
          </div> */}
        </div>

        <nav className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-6 font-semibold items-center">
            <li className="relative group rounded-md">
              <span className="flex items-center px-3 py-1 cursor-pointer text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-200">
                About Us <FaChevronDown className="ml-1 text-sm" />
              </span>
              <div className="absolute left-1/2 -translate-x-1/3 top-full hidden group-hover:block bg-white shadow-lg p-6 min-w-max z-10 w-[1200px] rounded-md border-t-4 border-blue-900">
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(ABOUT_US_MENU).map(([title, items]) => (
                    <div key={title}>
                      <h5 className="font-bold mb-2 uppercase text-blue-900 text-base">
                        {title}
                      </h5>
                      <ul>
                        {items.map((item) => (
                          <MenuItem key={item} text={item} />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </li>

            <li className="relative group rounded-md">
              <span className="flex items-center px-3 py-1 cursor-pointer text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-200">
                Academics <FaChevronDown className="ml-1 text-sm" />
              </span>
              <div className="absolute left-1/2 -translate-x-1/3 top-full hidden group-hover:block bg-white shadow-lg p-6 min-w-max z-10 w-[1200px] rounded-md border-t-4 border-blue-900">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-bold mb-2 uppercase text-blue-900 text-base">
                      {Object.keys(ACADEMICS_MENU)[0]}
                    </h5>
                    <ul>
                      {ACADEMICS_MENU["ACADEMICS @ KISHANGARH LAW COLLEGE (CO-EDU)"].map((item) => (
                        <MenuItem key={item} text={item} />
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold mb-2 uppercase text-blue-900 text-base">
                      DISCIPLINES
                    </h5>
                    <ul>
                      {ACADEMICS_MENU.DISCIPLINES_COL1.map((item) => (
                        <MenuItem key={item} text={item} />
                      ))}
                    </ul>
                  </div>
                  <div>
                    <ul className="mt-6">
                      {ACADEMICS_MENU.DISCIPLINES_COL2.map((item) => (
                        <MenuItem key={item} text={item} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <li className="relative group rounded-md">
              <span className="px-3 py-1 cursor-pointer text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-200">
                Facilities
              </span>
            </li>

            <li className="relative group rounded-md">
              <span className="px-3 py-1 cursor-pointer text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-200">
                Scholarships
              </span>
            </li>

            <li className="relative group rounded-md">
              <span className="flex items-center px-3 py-1 cursor-pointer text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-200">
                Campus Life <FaChevronDown className="ml-1 text-sm" />
              </span>
              <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg py-2 px-4 min-w-max z-10 rounded-md border-t-4 border-blue-900">
                {CAMPUS_LIFE_MENU.map((txt) => (
                  <li key={txt}>
                    <span className="block px-4 py-2 hover:bg-blue-900 hover:text-white cursor-pointer text-black text-base font-semibold">
                      {txt}
                    </span>
                  </li>
                ))}
              </ul>
            </li>

            <li className="relative group rounded-md">
              <span className="flex items-center px-3 py-1 cursor-pointer text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-200">
                Admissions 
                {/* <FaChevronDown className="ml-1 text-sm" /> */}


              </span>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => window.location.href = '/student/login'}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-300 font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2"
            >
              <FaUser className="text-sm" />
              <span>Student Login</span>
            </button>
            <button className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-2 rounded-full hover:from-yellow-500 hover:to-yellow-600 hover:text-blue-900 transition-all duration-300 cursor-pointer font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2">
              <span>Apply Now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <g clipPath="url(#clip0_201_978435345)">
                  <path
                    d="M1.42236 6.99728H13.089M13.089 6.99728L7.48903 1.39728M13.089 6.99728L7.48903 12.5973"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_201_978435345">
                    <rect width="14" height="14" fill="white" transform="translate(0.00927734)" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden bg-blue-900 text-white p-2 rounded-full hover:bg-blue-800 transition-all duration-300 hover:scale-105 shadow-md"
          >
            <FaBars className="text-xl" />
          </button>
        </div>
      </div>

      {notificationVisible && (
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 py-3 px-2 sm:px-4 text-gray-800 relative text-xs sm:text-sm overflow-hidden shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                🔥 HOT
              </div>
              <div className="inline-block animate-marquee-once font-bold">
                LLB, LLM & B.A LLB Admissions-2025 Open | Contact: 9649107150
              </div>
            </div>
            <button
              onClick={() => setNotificationVisible(false)}
              className="bg-white/20 hover:bg-white/30 p-1 rounded-full transition-colors duration-300"
            >
              <FaTimes className="text-gray-700" />
            </button>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="fixed top-0 right-0 w-full sm:w-3/4 h-full bg-gradient-to-br from-white to-blue-50 shadow-2xl z-50 p-4 overflow-y-auto md:hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-blue-900">Menu</h2>
            <button
              onClick={handleMenuClose}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300 hover:scale-105"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
          
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => window.location.href = '/student/login'}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-300 font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <FaUser />
                <span>Student Login</span>
              </button>
              <button className="w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-3 rounded-full hover:from-yellow-500 hover:to-yellow-600 hover:text-blue-900 transition-all duration-300 cursor-pointer font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                <span>Apply Now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <g clipPath="url(#clip0_201_978435345)">
                    <path
                      d="M1.42236 6.99728H13.089M13.089 6.99728L7.48903 1.39728M13.089 6.99728L7.48903 12.5973"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_201_978435345">
                      <rect width="14" height="14" fill="white" transform="translate(0.00927734)" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
          <ul className="flex flex-col space-y-2 text-blue-900 font-semibold">
            {renderMobileAdmissionsMenu()}

            <MobileAccordion
              title="About Us"
              isOpen={accordionStates.aboutUs}
              onToggle={() => toggleAccordion('aboutUs')}
            >
              <MobileAccordion
                title="About Us @ Kishangarh law college (CO-EDU)"
                isOpen={accordionStates.aboutSgv}
                onToggle={() => toggleAccordion('aboutSgv')}
              >
                {ABOUT_US_MENU["ABOUT US @ KISHANGARH LAW COLLEGE (CO-EDU)"].map((txt) => (
                  <li key={txt}>
                    <span className="block px-2 py-1 hover:bg-blue-900 hover:text-white cursor-pointer">
                      {txt}
                    </span>
                  </li>
                ))}
              </MobileAccordion>
              <MobileAccordion
                title="Leadership & Governance"
                isOpen={accordionStates.leadership}
                onToggle={() => toggleAccordion('leadership')}
              >
                {ABOUT_US_MENU["LEADERSHIP & GOVERNANCE"].map((txt) => (
                  <li key={txt}>
                    <span className="block px-2 py-1 hover:bg-blue-900 hover:text-white cursor-pointer">
                      {txt}
                    </span>
                  </li>
                ))}
              </MobileAccordion>
            </MobileAccordion>

            <MobileAccordion
              title="Academics"
              isOpen={accordionStates.academics}
              onToggle={() => toggleAccordion('academics')}
            >
              <MobileAccordion
                title="Academics @ Kishangarh law college (CO-EDU)"
                isOpen={accordionStates.academicsSgv}
                onToggle={() => toggleAccordion('academicsSgv')}
              >
                {ACADEMICS_MENU["ACADEMICS @ KISHANGARH LAW COLLEGE (CO-EDU)"].map((txt) => (
                  <li key={txt}>
                    <span className="block px-2 py-1 hover:bg-blue-900 hover:text-white cursor-pointer">
                      {txt}
                    </span>
                  </li>
                ))}
              </MobileAccordion>
              <MobileAccordion
                title="Disciplines"
                isOpen={accordionStates.disciplines}
                onToggle={() => toggleAccordion('disciplines')}
              >
                {[...ACADEMICS_MENU.DISCIPLINES_COL1, ...ACADEMICS_MENU.DISCIPLINES_COL2].map((txt) => (
                  <li key={txt}>
                    <span className="block px-2 py-1 hover:bg-blue-900 hover:text-white cursor-pointer">
                      {txt}
                    </span>
                  </li>
                ))}
              </MobileAccordion>
            </MobileAccordion>

            <li>
              <span className="block px-3 py-2 hover:bg-blue-900 hover:text-white cursor-pointer">
                Facilities
              </span>
            </li>
            <li>
              <span className="block px-3 py-2 hover:bg-blue-900 hover:text-white cursor-pointer">
                Scholarships
              </span>
            </li>

            <MobileAccordion
              title="Campus Life"
              isOpen={accordionStates.campusLife}
              onToggle={() => toggleAccordion('campusLife')}
            >
              <MobileAccordion
                title="Campus Life @ Kishangarh law college (CO-EDU)"
                isOpen={accordionStates.campusSgv}
                onToggle={() => toggleAccordion('campusSgv')}
              >
                {CAMPUS_LIFE_MENU.map((txt) => (
                  <li key={txt}>
                    <span className="block px-2 py-1 hover:bg-blue-900 hover:text-white cursor-pointer">
                      {txt}
                    </span>
                  </li>
                ))}
              </MobileAccordion>
            </MobileAccordion>
          </ul>
        </div>
      )}

    </header>
  );
};

export default Navbar;
