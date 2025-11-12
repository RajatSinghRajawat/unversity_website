// Simple Message Service for University Frontend
const API_BASE_URL = '${backendUrl}/api';

class MessageService {
  // Get messages for a student
  async getStudentMessages(email, universityCode = 'GYAN001') {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/student?email=${email}&universityCode=${universityCode}&limit=50`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return { success: false, message: 'Failed to fetch messages' };
    }
  }

  // Create a new message
  async createMessage(messageData) {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating message:', error);
      return { success: false, message: 'Failed to create message' };
    }
  }

  // Mark message as read
  async markAsRead(messageId) {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${messageId}/read`, {
        method: 'PUT'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error marking message as read:', error);
      return { success: false, message: 'Failed to mark as read' };
    }
  }

  // Delete message
  async deleteMessage(messageId) {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${messageId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting message:', error);
      return { success: false, message: 'Failed to delete message' };
    }
  }

  // Reply to a message
  async replyToMessage(messageId, replyData) {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${messageId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(replyData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error replying to message:', error);
      return { success: false, message: 'Failed to reply to message' };
    }
  }

  // Format message for display
  formatMessageForDisplay(message) {
    const isAdminMessage = message.sender_role === 'admin';
    
    // Format date safely
    let formattedDate = '';
    try {
      if (message.date) {
        formattedDate = new Date(message.date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      } else if (message.createdAt) {
        formattedDate = new Date(message.createdAt).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      } else {
        formattedDate = 'Date not available';
      }
    } catch (error) {
      formattedDate = 'Invalid date';
    }
    
    return {
      id: message._id,
      title: message.title,
      message: message.message,
      type: message.type,
      date: formattedDate,
      read: message.read || false,
      sent: !isAdminMessage, // Show as sent if student sent it
      isAdminMessage: isAdminMessage,
      sender_name: message.sender_name || 'Unknown',
      sender_role: message.sender_role,
      replies: (message.replies || []).map(reply => ({
        id: reply._id || Date.now(),
        message: reply.message,
        sender_name: reply.sender_name || 'Unknown',
        sender_role: reply.sender_role,
        timestamp: reply.timestamp 
          ? new Date(reply.timestamp).toLocaleString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          : 'Date not available'
      }))
    };
  }

  // Get message type display name
  getMessageTypeDisplay(type) {
    const types = {
      'general': 'General',
      'query': 'Query',
      'complaint': 'Complaint',
      'feedback': 'Feedback',
      'urgent': 'Urgent'
    };
    return types[type] || 'General';
  }
}

export default new MessageService();