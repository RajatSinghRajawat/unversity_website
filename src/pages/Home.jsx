import React, { useState, useEffect } from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaUser,
  FaQuestionCircle,
  FaArrowUp,
  FaArrowRight,
  FaEnvelope,
  FaGraduationCap,
  FaBookOpen,
  FaUsers,
  FaChartLine,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaHeart,
  FaShare,
  FaEye,
  FaDownload,
  FaExternalLinkAlt,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaMicroscope,
  FaFlask,
  FaLaptopCode,
  FaAtom,
  FaDna,
  FaCalculator,
  FaGlobe,
  FaLanguage,
  FaHistory,
  FaMap,
  FaHome,
  FaGamepad,
  FaBuilding
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCreative, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import "swiper/css/autoplay";
import "./Home.css";

import { useSlider } from "../hooks/useSlider";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useAnimatedNumbers } from "../hooks/useAnimatedNumbers";
import Card from "../components/common/Card";
import SectionHeader from "../components/common/SectionHeader";
import ActionButton from "../components/common/ActionButton";
import FloatingButton from "../components/common/FloatingButton";
import ApiService from "../services/api";

import {
  HERO_IMAGES,
  NEWS_CARDS,
  PROGRAM_CARDS,
  WHY_GYAN_VIHAR_SLIDES,
  EVENTS,
  ABOUT_DATA,
  RESEARCH_DATA,
  ACHIEVEMENT_DATA,
  CAMPUS_LIFE_DATA,
  TESTIMONIALS,
  ADMISSION_CARDS,
} from "../constants/data";

const Home = () => {
  const currentImage = useSlider(HERO_IMAGES.length, 4000);
  const currentWhySlide = useSlider(WHY_GYAN_VIHAR_SLIDES.length, 4000);
  const [showTopBtn, scrollToTop] = useScrollToTop(200);
  const animatedAboutNumbers = useAnimatedNumbers(ABOUT_DATA);
  const animatedAchievementNumbers = useAnimatedNumbers(ACHIEVEMENT_DATA);

  const [hoveredStates, setHoveredStates] = useState({
    news: null,
    program: null,
    why: null,
    event: null,
    research: null,
    card: null,
  });
  const [activeTab, setActiveTab] = useState("nav-alumni");
  
  // Dynamic data states
  const [dynamicData, setDynamicData] = useState({
    students: [],
    courses: [],
    stats: {
      totalStudents: 0,
      totalCourses: 0,
      unreadMessages: 0
    },
    loading: true
  });

  // View more states for different sections
  const [viewMoreStates, setViewMoreStates] = useState({
    news: false,
    events: false,
    programs: false,
    facilities: false,
    campusLife: false,
    admissions: false
  });

  // Items to show per section
  const [itemsToShow, setItemsToShow] = useState({
    news: 6,
    events: 3,
    programs: 4,
    facilities: 3,
    campusLife: 3,
    admissions: 3
  });
  const [likedItems, setLikedItems] = useState(new Set());
  const [viewedItems, setViewedItems] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(true);

  // Smooth scrolling function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const handleHover = (type, id) => {
    setHoveredStates((prev) => ({ ...prev, [type]: id }));
  };

  const handleLeave = (type) => {
    setHoveredStates((prev) => ({ ...prev, [type]: null }));
  };

  // Load dynamic data on component mount
  useEffect(() => {
    const loadDynamicData = async () => {
      try {
        const dashboardStats = await ApiService.getDashboardStats();
        setDynamicData({
          students: dashboardStats.students.slice(0, 6),
          courses: dashboardStats.courses.slice(0, 6),
          stats: {
            totalStudents: dashboardStats.totalStudents,
            totalCourses: dashboardStats.totalCourses,
            unreadMessages: dashboardStats.unreadMessages
          },
          loading: false
        });
      } catch (error) {
        console.error('Error loading dynamic data:', error);
        setDynamicData(prev => ({ ...prev, loading: false }));
      }
    };
    
    loadDynamicData();
  }, []);

  const floatingButtons = [
    { 
      icon: FaUser, 
      title: "Student Login", 
      action: () => {
        // Check if user is already logged in
        const isLoggedIn = localStorage.getItem('studentToken');
        if (isLoggedIn) {
          window.location.href = '/student/profile';
        } else {
          window.location.href = '/student/login';
        }
      },
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    { 
      icon: FaGraduationCap, 
      title: "Programs", 
      action: () => scrollToSection('programs'),
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    { 
      icon: FaBuilding, 
      title: "About Us", 
      action: () => scrollToSection('about'),
      color: 'bg-indigo-600 hover:bg-indigo-700'
    },
    { 
      icon: FaQuestionCircle, 
      title: "Help & Support", 
      action: () => {
        // Open help modal or redirect to help page
        const helpMessage = "Welcome to Kishangarh Girls & Law College Help Center!\n\nFor immediate assistance:\n• Call: +91-9414791273\n• Email: help@kishangarhgirlsandlawcollege.com\n• WhatsApp: +91-9414791273";
        alert(helpMessage);
      },
      color: 'bg-green-600 hover:bg-green-700'
    },
    { 
      icon: FaWhatsapp, 
      title: "WhatsApp", 
      action: () => {
        const message = encodeURIComponent("Hello! I'm interested in Kishangarh Girls & Law College. Can you provide more information?");
        window.open(`https://wa.me/919414791273?text=${message}`, '_blank');
      },
      color: 'bg-green-500 hover:bg-green-600'
    },
    { 
      icon: FaPhoneAlt, 
      title: "Call Now", 
      action: () => {
        // Show confirmation before calling
        if (confirm("Do you want to call Kishangarh Girls & Law College?\n\nPhone: +91-9414791273")) {
          window.open('tel:+919414791273');
        }
      },
      color: 'bg-red-600 hover:bg-red-700'
    },
  ];

  // Interactive functions
  const handleLike = (itemId, type) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(`${type}-${itemId}`)) {
        newSet.delete(`${type}-${itemId}`);
      } else {
        newSet.add(`${type}-${itemId}`);
      }
      return newSet;
    });
  };

  const handleView = (itemId, type) => {
    setViewedItems(prev => new Set([...prev, `${type}-${itemId}`]));
  };

  const handleShare = (item) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.desc || item.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = (item) => {
    // Implement download functionality
    console.log('Downloading:', item);
  };

  // Handle external links dynamically
  const handleExternalLink = (url) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.log('External link clicked but no URL provided');
    }
  };

  // Handle view more functionality
  const handleViewMore = (section) => {
    setViewMoreStates(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    
    // Update items to show
    setItemsToShow(prev => ({
      ...prev,
      [section]: prev[section] === 3 ? 6 : 3 // Toggle between 3 and 6 items
    }));
  };

  // Handle read more for individual items
  const handleReadMore = (item, type) => {
    // Show expanded content in a modal or expand inline
    const expandedContent = `
      ${item.title}
      
      ${item.desc || item.description}
      
      ${item.details || 'More details coming soon...'}
      
      Published: ${new Date().toLocaleDateString()}
    `;
    
    alert(expandedContent);
  };

  // Dynamic button actions
  const handleDynamicAction = (actionType, data = null) => {
    switch (actionType) {
      case 'viewMoreEvents':
        // Show more events on same page
        handleViewMore('events');
        break;
      case 'moreAboutAcademics':
        // Show more programs on same page
        handleViewMore('programs');
        break;
      case 'moreAboutCollege':
        // Navigate to about page
        window.location.href = '/about';
        break;
      case 'moreFacilities':
        // Show more facilities on same page
        handleViewMore('facilities');
        break;
      case 'exploreCampusLife':
        // Show more campus life on same page
        handleViewMore('campusLife');
        break;
      case 'moreAdmissions':
        // Show more admissions on same page
        handleViewMore('admissions');
        break;
      case 'readMoreNews':
        // Show more news on same page
        handleViewMore('news');
        break;
      case 'readMoreItem':
        // Show expanded content for individual item
        if (data) {
          handleReadMore(data, 'news');
        }
        break;
      case 'viewProgram':
        // Navigate to specific program page
        if (data) {
          window.location.href = `/programs/${data.id}`;
        }
        break;
      case 'viewEvent':
        // Navigate to specific event page
        if (data) {
          window.location.href = `/events/${data.id}`;
        }
        break;
      case 'viewFacility':
        // Navigate to specific facility page
        if (data) {
          window.location.href = `/facilities/${data.id}`;
        }
        break;
      case 'viewCampusLife':
        // Navigate to specific campus life page
        if (data) {
          window.location.href = `/campus-life/${data.id}`;
        }
        break;
      case 'viewAdmission':
        // Navigate to specific admission page
        if (data) {
          window.location.href = `/admissions/${data.id}`;
        }
        break;
      case 'downloadNews':
        // Download news article or related content
        if (data) {
          // Create a downloadable link for the news content
          const content = `${data.title}\n\n${data.desc}\n\nPublished: ${new Date().toLocaleDateString()}`;
          const blob = new Blob([content], { type: 'text/plain' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${data.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
        break;
      case 'shareContent':
        // Share content using Web Share API or fallback
        if (data) {
          if (navigator.share) {
            navigator.share({
              title: data.title,
              text: data.desc || data.description,
              url: window.location.href
            });
          } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${data.title}\n${data.desc}\n${window.location.href}`);
            alert('Content link copied to clipboard!');
          }
        }
        break;
      case 'viewStats':
        // Show detailed statistics
        alert(`College Statistics:\n\n• Total Students: ${dynamicData.stats.totalStudents}\n• Active Courses: ${dynamicData.stats.totalCourses}\n• Success Rate: 95%\n• Years Experience: 15+`);
        break;
      case 'contactAdmission':
        // Contact admission office
        const admissionMessage = "Admission Office Contact:\n\n• Phone: +91-9414791273\n• Email: admissions@kishangarhgirlsandlawcollege.com\n• Office Hours: 9 AM - 5 PM (Mon-Fri)";
        alert(admissionMessage);
        break;
      default:
        console.log('Unknown action type:', actionType);
    }
  };

  const formatAnimatedNumber = (data, index, animatedValue) => {
    const original = data[index].number;
    if (animatedValue === 0) return original;
    return animatedValue + (original.includes("+") ? "+" : "");
  };

  return (
    <div className="relative bg-gray-50">
      <div className="hero-slider relative">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={img}
              alt={`Kishangarh Girls & Law College ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-transparent flex items-center">
              <div className="max-w-7xl mx-auto px-4 w-full animate-fadeInUp">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                  Kishangarh Girls & Law College
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 mb-6 drop-shadow-lg">
                  Empowering Women Through Education
                </p>
                <p className="text-lg text-white/90 max-w-2xl drop-shadow">
                  Recognized by Rajasthan Government and Raj Rishi Bhartrihari Matsya University, Alwar
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => window.location.href = '/student/login'}
                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse-slow"
                  >
                    Student Login
                  </button>
                  <button
                    onClick={() => scrollToSection('admissions')}
                    className="bg-white hover:bg-blue-50 text-blue-900 px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Hero Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                // This would need state management for manual navigation
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImage
                  ? "bg-yellow-400 w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="fixed top-1/3 right-4 flex flex-col space-y-3 z-50">
        {floatingButtons.map((btn, index) => (
          <FloatingButton 
            key={index} 
            icon={btn.icon} 
            title={btn.title}
            onClick={btn.action}
            className={`${btn.color} shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 rounded-full`}
          />
        ))}
      </div>

      {showTopBtn && (
        <FloatingButton
          icon={FaArrowUp}
          title="Scroll to Top"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 rounded-full"
        />
      )}

      {/* Dynamic Stats Section */}
      <section className="py-12 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-blue-800/10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-8 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 animate-pulse-slow">Kishangarh Girls & Law College</h2>
            <p className="text-blue-200 text-lg">Empowering Women Through Education</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div 
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-white/20 cursor-pointer animate-fadeInUp stat-number"
              style={{ animationDelay: '0.1s' }}
              onClick={() => handleDynamicAction('viewStats')}
            >
              <FaUsers className="text-4xl mx-auto mb-3 text-yellow-300 animate-float" />
              <div className="text-3xl font-bold mb-1 stat-number">{dynamicData.loading ? '...' : dynamicData.stats.totalStudents}+</div>
              <div className="text-sm opacity-90 font-medium">Total Students</div>
            </div>
            <div 
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-white/20 cursor-pointer animate-fadeInUp stat-number"
              style={{ animationDelay: '0.2s' }}
              onClick={() => handleDynamicAction('moreAboutAcademics')}
            >
              <FaBookOpen className="text-4xl mx-auto mb-3 text-green-300 animate-float" style={{ animationDelay: '0.1s' }} />
              <div className="text-3xl font-bold mb-1 stat-number">{dynamicData.loading ? '...' : dynamicData.stats.totalCourses}</div>
              <div className="text-sm opacity-90 font-medium">Active Courses</div>
            </div>
            <div 
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-white/20 cursor-pointer animate-fadeInUp stat-number"
              style={{ animationDelay: '0.3s' }}
              onClick={() => handleDynamicAction('viewStats')}
            >
              <FaGraduationCap className="text-4xl mx-auto mb-3 text-purple-300 animate-float" style={{ animationDelay: '0.2s' }} />
              <div className="text-3xl font-bold mb-1 stat-number">95%</div>
              <div className="text-sm opacity-90 font-medium">Success Rate</div>
            </div>
            <div 
              className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-white/20 cursor-pointer animate-fadeInUp stat-number"
              style={{ animationDelay: '0.4s' }}
              onClick={() => handleDynamicAction('moreAboutCollege')}
            >
              <FaChartLine className="text-4xl mx-auto mb-3 text-orange-300 animate-float" style={{ animationDelay: '0.3s' }} />
              <div className="text-3xl font-bold mb-1 stat-number">15+</div>
              <div className="text-sm opacity-90 font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="py-16 bg-gray-100">
        <SectionHeader
          title="Kishangarh Girls & Law College Today"
          subtitle="The latest news from Kishangarh Girls & Law College"
        />
        <div className="news-grid max-w-7xl mx-auto px-4">
          {NEWS_CARDS.slice(0, itemsToShow.news).map((card) => (
            <div
              key={card.id}
              className={`card ${card.big ? "news-big" : ""} group relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              onMouseEnter={() => {
                handleHover("news", card.id);
                handleView(card.id, "news");
              }}
              onMouseLeave={() => handleLeave("news")}
            >
              <div className="relative overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className={`card-image ${card.big ? "h-80" : "h-64"} group-hover:scale-110 transition-transform duration-500`}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&auto=format";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Interactive buttons */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleLike(card.id, "news")}
                    className={`p-2 rounded-full shadow-lg transition-all duration-200 ${
                      likedItems.has(`news-${card.id}`) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <FaHeart className="text-sm" />
                  </button>
                  <button
                    onClick={() => handleDynamicAction('shareContent', card)}
                    className="p-2 rounded-full bg-white/80 text-gray-700 hover:bg-blue-500 hover:text-white shadow-lg transition-all duration-200"
                  >
                    <FaShare className="text-sm" />
                  </button>
                </div>

                <button
                  className={`absolute bottom-4 right-4 bg-yellow-400 text-black p-3 rounded-full shadow-lg transform transition-all duration-300 hover:bg-yellow-500 ${
                    hoveredStates.news === card.id
                      ? "rotate-45 opacity-100 scale-110"
                      : "opacity-0"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDynamicAction('readMoreNews', card);
                  }}
                >
                  <FaArrowRight size={20} />
                </button>

                {/* View indicator */}
                {viewedItems.has(`news-${card.id}`) && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    <FaEye className="inline mr-1" />
                    Viewed
                  </div>
                )}
              </div>
              <div className="card-content p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full">Latest News</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <FaClock className="mr-1" />
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
                <h3 className="card-title text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="card-desc text-gray-600 leading-relaxed mb-4">{card.desc}</p>
                
                {/* Action buttons */}
                <div className="mt-4 flex items-center justify-between">
                  <button 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    onClick={() => handleDynamicAction('readMoreNews', card)}
                  >
                    <span className="font-medium">Read More</span>
                    <FaArrowRight className="text-sm" />
                  </button>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDynamicAction('downloadNews', card)}
                      className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 hover:bg-blue-50 rounded-full"
                      title="Download"
                    >
                      <FaDownload />
                    </button>
                    <button
                      onClick={() => handleDynamicAction('readMoreNews', card)}
                      className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 hover:bg-blue-50 rounded-full"
                      title="External Link"
                    >
                      <FaExternalLinkAlt />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <ActionButton 
            text={viewMoreStates.news ? "Show Less News" : "More Kishangarh Girls & Law College News"} 
            onClick={() => handleDynamicAction('readMoreNews')} 
          />
        </div>
      </section>

      <section id="programs" className="py-16 bg-white">
        <SectionHeader
          title="Programs"
          subtitle="Excellence and virtue delivered through a pedagogy prepared by subject experts and industry leaders"
        />
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {PROGRAM_CARDS.slice(0, itemsToShow.programs).map((card) => (
            <div
              key={card.id}
              className="card group relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onMouseEnter={() => handleHover("program", card.id)}
              onMouseLeave={() => handleLeave("program")}
              onClick={() => handleDynamicAction('viewProgram', card)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="card-image h-64 group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <button
                  className={`absolute bottom-4 right-4 bg-yellow-400 text-black p-3 rounded-full shadow-lg transform transition-all duration-300 hover:bg-yellow-500 ${
                    hoveredStates.program === card.id
                      ? "rotate-45 opacity-100 scale-110"
                      : "opacity-0"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDynamicAction('viewProgram', card);
                  }}
                >
                  <FaArrowRight size={20} />
                </button>
              </div>
              <div className="card-content p-6">
                <h3 className="card-title text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="card-desc text-gray-600 leading-relaxed mb-4">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <ActionButton 
            text={viewMoreStates.programs ? "Show Less Programs" : "More About Academics"} 
            onClick={() => handleDynamicAction('moreAboutAcademics')} 
          />
        </div>
      </section>

      <section id="why-choose-us" className="py-16 bg-gray-100">
        <SectionHeader title="Why Kishangarh Girls & Law College?" />
        <div className="max-w-7xl mx-auto relative overflow-hidden">
          <div
            className="why-slider"
            style={{ transform: `translateX(-${currentWhySlide * 33.333}%)` }}
          >
            {WHY_GYAN_VIHAR_SLIDES.map((slide, index) => (
              <div key={index} className="why-slide">
                <Card
                  image={slide.img}
                  title={slide.title}
                  desc={slide.desc}
                  imageHeight="h-64"
                  className="text-center"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="py-16 bg-gray-100">
        <SectionHeader title="Don't Miss Out" subtitle="Upcoming Events" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {EVENTS.slice(0, itemsToShow.events).map((event) => (
            <div
              key={event.id}
              className="card group relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onMouseEnter={() => handleHover("event", event.id)}
              onMouseLeave={() => handleLeave("event")}
              onClick={() => handleDynamicAction('viewEvent', event)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.img}
                  alt={event.title}
                  className="card-image h-48 group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop&auto=format";
                  }}
                />
                <div className="absolute top-2 left-2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm font-bold">
                  {event.date}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <button
                  className={`absolute bottom-4 right-4 bg-yellow-400 text-black p-3 rounded-full shadow-lg transform transition-all duration-300 hover:bg-yellow-500 ${
                    hoveredStates.event === event.id
                      ? "rotate-45 opacity-100 scale-110"
                      : "opacity-0"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDynamicAction('viewEvent', event);
                  }}
                >
                  <FaArrowRight size={20} />
                </button>
              </div>
              <div className="card-content p-6">
                <h3 className="card-title text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{event.title}</h3>
                <p className="card-desc text-gray-600 leading-relaxed mb-2">{event.description}</p>
                <p className="text-gray-800 font-semibold">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <ActionButton 
            text={viewMoreStates.events ? "Show Less Events" : "View More Events"} 
            onClick={() => handleDynamicAction('viewMoreEvents')} 
          />
        </div>
      </section>

      <section id="about" className="py-16 bg-white text-center">
        <SectionHeader
          title="About Kishangarh Girls & Law College"
          subtitle="Empowering women through quality education and holistic development in a supportive environment"
        />
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-b py-10">
          {ABOUT_DATA.map((item, index) => (
            <div key={item.id}>
              <h3 className="text-2xl font-bold text-blue-900">
                {formatAnimatedNumber(ABOUT_DATA, index, animatedAboutNumbers[index])}
              </h3>
              <p className="text-gray-700 mt-2">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <ActionButton text="More About Kishangarh Girls & Law College" onClick={() => handleDynamicAction('moreAboutCollege')} />
        </div>
      </section>

      <section id="facilities" className="py-16 bg-gray-100">
        <SectionHeader title="College Facilities" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {RESEARCH_DATA.slice(0, itemsToShow.facilities).map((card) => (
            <div
              key={card.id}
              className="card group relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onMouseEnter={() => handleHover("research", card.id)}
              onMouseLeave={() => handleLeave("research")}
              onClick={() => handleDynamicAction('viewFacility', card)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="card-image h-64 group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <button
                  className={`absolute bottom-4 right-4 bg-yellow-400 text-black p-3 rounded-full shadow-lg transform transition-all duration-300 hover:bg-yellow-500 ${
                    hoveredStates.research === card.id
                      ? "rotate-45 opacity-100 scale-110"
                      : "opacity-0"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDynamicAction('viewFacility', card);
                  }}
                >
                  <FaArrowRight size={20} />
                </button>
              </div>
              <div className="card-content p-6">
                <h3 className="card-title text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="card-desc text-gray-600 leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <ActionButton 
            text={viewMoreStates.facilities ? "Show Less Facilities" : "More Facilities Details"} 
            onClick={() => handleDynamicAction('moreFacilities')} 
          />
        </div>
      </section>

      <section id="achievements" className="py-16 bg-white text-center">
        <SectionHeader
          title="College Achievements"
          subtitle="Excellence in Education: Committed to providing quality education and student success"
        />
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-b py-10">
          {ACHIEVEMENT_DATA.map((item, index) => (
            <div key={item.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3 className="text-2xl font-bold text-blue-900">
                {formatAnimatedNumber(
                  ACHIEVEMENT_DATA,
                  index,
                  animatedAchievementNumbers[index]
                )}
              </h3>
              <p className="text-gray-700 mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="campus-life" className="py-16 bg-gray-100">
        <SectionHeader title="Campus Life" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {CAMPUS_LIFE_DATA.slice(0, itemsToShow.campusLife).map((item) => (
            <div
              key={item.id}
              className="card group relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => handleDynamicAction('viewCampusLife', item)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-image h-64 group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop&auto=format";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <button
                  className="absolute bottom-4 right-4 bg-yellow-400 text-black p-3 rounded-full shadow-lg transform transition-all duration-300 hover:bg-yellow-500 opacity-0 group-hover:opacity-100 rotate-45 scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDynamicAction('viewCampusLife', item);
                  }}
                >
                  <FaArrowRight size={20} />
                </button>
              </div>
              <div className="card-content p-6 text-center">
                <h3 className="card-title text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="card-desc text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <ActionButton 
            text={viewMoreStates.campusLife ? "Show Less Campus Life" : "Explore More Campus Life"} 
            onClick={() => handleDynamicAction('exploreCampusLife')} 
          />
        </div>
      </section>

      <section id="testimonials" className="py-16 bg-gray-100">
        <SectionHeader title="Testimonials" />
        <nav className="flex justify-center space-x-4 mb-8">
          {Object.keys(TESTIMONIALS).map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-blue-900 text-white"
                  : "bg-yellow-400 text-black hover:bg-blue-900 hover:text-white"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace("nav-", "").toUpperCase()}
            </button>
          ))}
        </nav>
        <div className="max-w-7xl mx-auto px-4">
          <Swiper
            modules={[Navigation, Pagination, EffectCreative]}
            effect="creative"
            creativeEffect={{
              prev: { translate: ["-120%", 0, -200] },
              next: { translate: ["120%", 0, -200] },
            }}
            navigation
            pagination={{ clickable: true }}
            loop
            speed={1000}
            className="mySwiper"
          >
            {TESTIMONIALS[activeTab].map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="card flex flex-col md:flex-row items-center p-6 mx-4">
                  <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-64 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&auto=format";
                      }}
                    />
                  </div>
                  <div className="w-full md:w-2/3 md:pl-6 text-center md:text-left">
                    <p className="text-lg text-gray-600 italic mb-4">
                      "{testimonial.quote}"
                    </p>
                    <p className="text-blue-900 font-bold">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section id="admissions" className="py-16 bg-gray-100">
        <SectionHeader
          title="Admissions"
          subtitle="An extraordinary freedom of opportunity to explore, to collaborate, and to challenge yourself"
        />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {ADMISSION_CARDS.slice(0, itemsToShow.admissions).map((card) => (
            <div
              key={card.id}
              className="card group relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onMouseEnter={() => handleHover("card", card.id)}
              onMouseLeave={() => handleLeave("card")}
              onClick={() => handleDynamicAction('viewAdmission', card)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="card-image h-64 group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <button
                  className={`absolute bottom-4 right-4 bg-yellow-400 text-black p-3 rounded-full shadow-lg transform transition-all duration-300 hover:bg-yellow-500 ${
                    hoveredStates.card === card.id
                      ? "rotate-45 opacity-100 scale-110"
                      : "opacity-0"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDynamicAction('viewAdmission', card);
                  }}
                >
                  <FaArrowRight size={20} />
                </button>
              </div>
              <div className="card-content p-6 text-center">
                <h3 className="card-title text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <ActionButton 
            text={viewMoreStates.admissions ? "Show Less Admissions" : "More About Admissions"} 
            onClick={() => handleDynamicAction('moreAdmissions')} 
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
