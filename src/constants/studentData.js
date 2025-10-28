// ==================== STUDENT PANEL DATA ====================

// Demo student data (In production, this would come from API)
export const DEMO_STUDENT = {
  enrollmentNo: "SGVU2024001",
  name: "Rajat Singh",
  email: "rajat.singh@student.gyanvihar.org",
  course: "B.Tech Computer Science Engineering",
  semester: "6th Semester",
  batch: "2022-2026",
  profileImage: "https://via.placeholder.com/150",
  phone: "+91 9876543210",
  address: "Jaipur, Rajasthan"
};

// Student navigation menu
export const STUDENT_NAV_MENU = [
  { id: 1, name: "Dashboard", path: "/student", icon: "home" },
  { id: 2, name: "Results", path: "/student/results", icon: "results" },
  { id: 3, name: "Admit Card", path: "/student/admit-card", icon: "card" },
  { id: 4, name: "Messages", path: "/student/messages", icon: "message" },
  { id: 5, name: "Profile", path: "/student/profile", icon: "profile" },
];

// Student dashboard cards
export const DASHBOARD_CARDS = [
  {
    id: 1,
    title: "Attendance",
    value: "85%",
    icon: "📊",
    color: "bg-blue-500",
    description: "Current Semester"
  },
  {
    id: 2,
    title: "CGPA",
    value: "8.5",
    icon: "🎓",
    color: "bg-green-500",
    description: "Overall"
  },
  {
    id: 3,
    title: "Pending Fees",
    value: "₹0",
    icon: "💰",
    color: "bg-yellow-500",
    description: "All Cleared"
  },
  {
    id: 4,
    title: "Assignments",
    value: "3",
    icon: "📝",
    color: "bg-purple-500",
    description: "Pending"
  }
];

// Sample results data
export const SAMPLE_RESULTS = [
  {
    id: 1,
    semester: "5th Semester",
    subjects: [
      { name: "Data Structures", marks: 85, grade: "A" },
      { name: "Database Management", marks: 90, grade: "A+" },
      { name: "Operating Systems", marks: 82, grade: "A" },
      { name: "Computer Networks", marks: 88, grade: "A" },
      { name: "Web Development", marks: 92, grade: "A+" }
    ],
    sgpa: "8.7",
    status: "Pass"
  },
  {
    id: 2,
    semester: "4th Semester",
    subjects: [
      { name: "Java Programming", marks: 88, grade: "A" },
      { name: "Software Engineering", marks: 85, grade: "A" },
      { name: "Design Patterns", marks: 90, grade: "A+" },
      { name: "Cloud Computing", marks: 87, grade: "A" },
      { name: "Mobile Development", marks: 89, grade: "A" }
    ],
    sgpa: "8.8",
    status: "Pass"
  },
  {
    id: 3,
    semester: "3rd Semester",
    subjects: [
      { name: "Data Structures", marks: 82, grade: "A" },
      { name: "Computer Organization", marks: 80, grade: "A" },
      { name: "Discrete Mathematics", marks: 85, grade: "A" },
      { name: "Digital Electronics", marks: 83, grade: "A" },
      { name: "Python Programming", marks: 88, grade: "A" }
    ],
    sgpa: "8.4",
    status: "Pass"
  }
];

// Sample admit cards
export const ADMIT_CARDS = [
  {
    id: 1,
    examName: "End Semester Examination - Dec 2024",
    semester: "6th Semester",
    startDate: "15 Dec 2024",
    endDate: "28 Dec 2024",
    venue: "Main Block, SGVU Campus",
    status: "Available",
    instructions: [
      "Bring your ID card and admit card to the examination hall",
      "Report to the venue 30 minutes before the exam",
      "Electronic devices are not allowed",
      "Follow all COVID-19 safety protocols"
    ]
  },
  {
    id: 2,
    examName: "Mid Semester Examination - Oct 2024",
    semester: "6th Semester",
    startDate: "10 Oct 2024",
    endDate: "20 Oct 2024",
    venue: "Main Block, SGVU Campus",
    status: "Completed"
  }
];

// Sample messages
export const SAMPLE_MESSAGES = [
  {
    id: 1,
    title: "Fee Payment Reminder",
    message: "Your semester fee payment is due by 15th December 2024. Please complete the payment to avoid late fees.",
    date: "2024-12-01",
    type: "urgent",
    read: false
  },
  {
    id: 2,
    title: "Examination Schedule Released",
    message: "The End Semester Examination schedule for December 2024 has been released. Check your admit card section for details.",
    date: "2024-11-28",
    type: "info",
    read: false
  },
  {
    id: 3,
    title: "Workshop on AI & Machine Learning",
    message: "Join us for an exciting workshop on AI & ML on 20th December 2024. Register now!",
    date: "2024-11-25",
    type: "event",
    read: true
  },
  {
    id: 4,
    title: "Library Books Return Reminder",
    message: "You have 2 books due for return. Please return them by 10th December 2024.",
    date: "2024-11-20",
    type: "warning",
    read: true
  },
  {
    id: 5,
    title: "Placement Drive Notification",
    message: "TCS Campus Placement Drive scheduled for 5th January 2025. Eligible students can register through placement portal.",
    date: "2024-11-15",
    type: "info",
    read: true
  }
];

// Quick links for student dashboard
export const QUICK_LINKS = [
  { name: "Time Table", icon: "📅", link: "/student/timetable" },
  { name: "Library", icon: "📚", link: "/student/library" },
  { name: "Fee Payment", icon: "💳", link: "/student/fees" },
  { name: "Assignments", icon: "📄", link: "/student/assignments" },
  { name: "E-Learning", icon: "💻", link: "/student/elearning" },
  { name: "Attendance", icon: "✅", link: "/student/attendance" }
];

// Recent activities
export const RECENT_ACTIVITIES = [
  {
    id: 1,
    activity: "Submitted Assignment - Web Development",
    time: "2 hours ago",
    icon: "✓"
  },
  {
    id: 2,
    activity: "Attended Lecture - Database Management",
    time: "5 hours ago",
    icon: "✓"
  },
  {
    id: 3,
    activity: "Downloaded Study Material - Operating Systems",
    time: "1 day ago",
    icon: "↓"
  },
  {
    id: 4,
    activity: "Fee Payment Completed",
    time: "3 days ago",
    icon: "₹"
  }
];

// Upcoming events
export const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Mid Semester Exam - Database Management",
    date: "15 Dec 2024",
    time: "10:00 AM",
    type: "exam"
  },
  {
    id: 2,
    title: "Assignment Submission - Web Development",
    date: "18 Dec 2024",
    time: "11:59 PM",
    type: "assignment"
  },
  {
    id: 3,
    title: "Workshop - Cloud Computing",
    date: "20 Dec 2024",
    time: "2:00 PM",
    type: "event"
  }
];

