// Comprehensive API service for University frontend
const API_BASE_URL = '${backendUrl}/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get headers for API requests
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add authentication token if available
    const token = localStorage.getItem('studentToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Generic request method with error handling
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Student APIs
  async getAllStudents(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.universityCode) queryParams.append('universityCode', params.universityCode);
      
      const queryString = queryParams.toString();
      const endpoint = `/students/all${queryString ? `?${queryString}` : ''}`;
      
      return await this.request(endpoint);
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  }

  async searchStudents(query, params = {}) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('query', query);
      if (params.universityCode) queryParams.append('universityCode', params.universityCode);
      
      const queryString = queryParams.toString();
      const endpoint = `/students/search?${queryString}`;
      
      return await this.request(endpoint);
    } catch (error) {
      console.error('Error searching students:', error);
      throw error;
    }
  }

  async getStudentById(id) {
    try {
      return await this.request(`/students/get/${id}`);
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  }

  // Course APIs
  async getAllCourses(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.universityCode) queryParams.append('universityCode', params.universityCode);
      if (params.department) queryParams.append('department', params.department);
      if (params.semester) queryParams.append('semester', params.semester);
      if (params.isActive !== undefined) queryParams.append('isActive', params.isActive);
      
      const queryString = queryParams.toString();
      const endpoint = `/courses/all${queryString ? `?${queryString}` : ''}`;
      
      return await this.request(endpoint);
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }

  async searchCourses(query, params = {}) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('query', query);
      if (params.universityCode) queryParams.append('universityCode', params.universityCode);
      
      const queryString = queryParams.toString();
      const endpoint = `/courses/search?${queryString}`;
      
      return await this.request(endpoint);
    } catch (error) {
      console.error('Error searching courses:', error);
      throw error;
    }
  }

  async getCourseById(id) {
    try {
      return await this.request(`/courses/get/${id}`);
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  }

  async getCoursesByDepartment(department, params = {}) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('department', department);
      if (params.universityCode) queryParams.append('universityCode', params.universityCode);
      
      const queryString = queryParams.toString();
      const endpoint = `/courses/department?${queryString}`;
      
      return await this.request(endpoint);
    } catch (error) {
      console.error('Error fetching courses by department:', error);
      throw error;
    }
  }

  // Message APIs
  async getAllMessages(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.type) queryParams.append('type', params.type);
      if (params.read !== undefined) queryParams.append('read', params.read);
      if (params.student_id) queryParams.append('student_id', params.student_id);
      if (params.universityCode) queryParams.append('universityCode', params.universityCode);
      
      const queryString = queryParams.toString();
      const endpoint = `/messages/all${queryString ? `?${queryString}` : ''}`;
      
      return await this.request(endpoint);
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  async getMessageStats(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.universityCode) queryParams.append('universityCode', params.universityCode);
      
      const queryString = queryParams.toString();
      const endpoint = `/messages/stats${queryString ? `?${queryString}` : ''}`;
      
      return await this.request(endpoint);
    } catch (error) {
      console.error('Error fetching message stats:', error);
      throw error;
    }
  }

  async createMessage(messageData) {
    try {
      return await this.request('/messages/create', {
        method: 'POST',
        body: JSON.stringify(messageData),
      });
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  }

  // Admit Card APIs
  async getAllAdmitCards(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.student_id) queryParams.append('student_id', params.student_id);
      if (params.course_id) queryParams.append('course_id', params.course_id);
      if (params.semester) queryParams.append('semester', params.semester);
      if (params.exam_type) queryParams.append('exam_type', params.exam_type);
      if (params.status) queryParams.append('status', params.status);
      if (params.universityCode) queryParams.append('universityCode', params.universityCode);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      
      const queryString = queryParams.toString();
      const endpoint = `/admitcards/all${queryString ? `?${queryString}` : ''}`;
      
      return await this.request(endpoint);
    } catch (error) {
      console.error('Error fetching admit cards:', error);
      throw error;
    }
  }

  async getAdmitCardById(id) {
    try {
      console.log('Fetching admit card by ID:', id);
      return await this.request(`/admitcards/get/${id}`);
    } catch (error) {
      console.error('Error fetching admit card:', error);
      throw error;
    }
  }

  async getAdmitCardsByStudent(studentId, params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.semester) queryParams.append('semester', params.semester);
      if (params.exam_type) queryParams.append('exam_type', params.exam_type);
      if (params.status) queryParams.append('status', params.status);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      
      const queryString = queryParams.toString();
      const endpoint = `/admitcards/student/${studentId}${queryString ? `?${queryString}` : ''}`;
      
      return await this.request(endpoint);
    } catch (error) {
      console.error('Error fetching student admit cards:', error);
      throw error;
    }
  }

  async getAdmitCardsByCourse(courseId, params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.semester) queryParams.append('semester', params.semester);
      if (params.exam_type) queryParams.append('exam_type', params.exam_type);
      if (params.status) queryParams.append('status', params.status);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      
      const queryString = queryParams.toString();
      const endpoint = `/admitcards/course/${courseId}${queryString ? `?${queryString}` : ''}`;
      
      return await this.request(endpoint);
    } catch (error) {
      console.error('Error fetching course admit cards:', error);
      throw error;
    }
  }

  async searchAdmitCards(query, params = {}) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('query', query);
      if (params.universityCode) queryParams.append('universityCode', params.universityCode);
      
      const queryString = queryParams.toString();
      const endpoint = `/admitcards/search?${queryString}`;
      
      return await this.request(endpoint);
    } catch (error) {
      console.error('Error searching admit cards:', error);
      throw error;
    }
  }

  async getUpcomingExams(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.universityCode) queryParams.append('universityCode', params.universityCode);
      if (params.days) queryParams.append('days', params.days);
      
      const queryString = queryParams.toString();
      const endpoint = `/admitcards/upcoming${queryString ? `?${queryString}` : ''}`;
      
      return await this.request(endpoint);
    } catch (error) {
      console.error('Error fetching upcoming exams:', error);
      throw error;
    }
  }

  async createAdmitCard(admitCardData) {
    try {
      return await this.request('/admitcards/create', {
        method: 'POST',
        body: JSON.stringify(admitCardData),
      });
    } catch (error) {
      console.error('Error creating admit card:', error);
      throw error;
    }
  }

  async updateAdmitCard(id, updateData) {
    try {
      return await this.request(`/admitcards/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
      });
    } catch (error) {
      console.error('Error updating admit card:', error);
      throw error;
    }
  }

  async deleteAdmitCard(id) {
    try {
      return await this.request(`/admitcards/delete/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting admit card:', error);
      throw error;
    }
  }

  // Statistics and Analytics
  async getDashboardStats(params = {}) {
    try {
      const [studentsData, coursesData, messageStats] = await Promise.all([
        this.getAllStudents(params),
        this.getAllCourses(params),
        this.getMessageStats(params)
      ]);
      
      return {
        totalStudents: studentsData.count || 0,
        totalCourses: coursesData.count || 0,
        unreadMessages: messageStats.data?.unreadMessages || 0,
        totalMessages: messageStats.data?.totalMessages || 0,
        students: studentsData.data || [],
        courses: coursesData.data || [],
        messageStats: messageStats.data || {}
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  // News and Events (placeholder for future implementation)
  async getNews(params = {}) {
    // This would be implemented when news API is available
    return {
      success: true,
      data: [],
      count: 0
    };
  }

  async getEvents(params = {}) {
    // This would be implemented when events API is available
    return {
      success: true,
      data: [],
      count: 0
    };
  }

  // Helper methods
  formatStudentForDisplay(student) {
    return {
      id: student._id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      department: student.department,
      year: student.year,
      enrollmentId: student.enrollmentId,
      course: student.course_id?.courseName || 'N/A',
      image: student.image ? `/uploads/${student.image}` : null
    };
  }

  formatCourseForDisplay(course) {
    return {
      id: course._id,
      courseName: course.courseName,
      courseCode: course.courseCode,
      department: course.department,
      duration: course.duration,
      semester: course.semester,
      year: course.year,
      price: course.price,
      discountPrice: course.discountPrice,
      bannerImage: course.bannerImage ? `/uploads/${course.bannerImage}` : null,
      description: course.description,
      instructor: course.instructor
    };
  }

  formatMessageForDisplay(message) {
    return {
      id: message._id,
      title: message.title,
      message: message.message,
      type: message.type,
      read: message.read,
      date: message.date || new Date(message.createdAt).toLocaleDateString(),
      senderRole: message.sender_role,
      senderName: message.sender_name,
      student: message.student_id ? {
        name: message.student_id.name,
        email: message.student_id.email,
        rollNumber: message.student_id.rollNumber
      } : null,
      replies: message.replies || []
    };
  }
}

export default new ApiService();