import React, { useState, useEffect } from 'react';
import { 
  FaEnvelope, 
  FaEnvelopeOpen, 
  FaExclamationCircle, 
  FaInfoCircle, 
  FaCalendarAlt,
  FaTrash,
  FaSearch,
  FaFilter,
  FaPlus,
  FaPaperPlane,
  FaTimes,
  FaSpinner
} from 'react-icons/fa';
import StudentNavbar from '../components/StudentNavbar';
import { SAMPLE_MESSAGES, DEMO_STUDENT } from '../constants/studentData';
import messageService from '../services/messageService';

const StudentMessage = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showComposeForm, setShowComposeForm] = useState(false);
  const [composeForm, setComposeForm] = useState({
    title: '',
    message: '',
    type: 'general'
  });
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(false);

  // Load messages on component mount
  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get messages for the university (no specific student filter for demo)
      // In a real app, this would filter by authenticated student
      const response = await messageService.getStudentMessages(
        DEMO_STUDENT.email,
        'GYAN001'
      );
      
      if (response.success) {
        const formattedMessages = response.data.map(msg => 
          messageService.formatMessageForDisplay(msg)
        );
        setMessages(formattedMessages);
      } else {
        // Fallback to sample messages if API fails
        setMessages(SAMPLE_MESSAGES);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setError('Failed to load messages. Using sample data.');
      // Fallback to sample messages
      setMessages(SAMPLE_MESSAGES);
    } finally {
      setLoading(false);
    }
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'urgent':
        return { icon: FaExclamationCircle, color: 'text-red-500' };
      case 'complaint':
        return { icon: FaExclamationCircle, color: 'text-yellow-500' };
      case 'query':
        return { icon: FaInfoCircle, color: 'text-blue-500' };
      case 'feedback':
        return { icon: FaInfoCircle, color: 'text-green-500' };
      case 'general':
      default:
        return { icon: FaInfoCircle, color: 'text-blue-500' };
    }
  };

  const markAsRead = async (id) => {
    try {
      // Update local state immediately for better UX
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      ));
      
      // Call API to mark as read
      await messageService.markAsRead(id);
    } catch (error) {
      console.error('Error marking message as read:', error);
      // Revert local state if API call fails
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, read: false } : msg
      ));
    }
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    markAsRead(message.id);
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        // Update local state immediately for better UX
        setMessages(messages.filter(msg => msg.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
        
        // Call API to delete message
        await messageService.deleteMessage(id);
      } catch (error) {
        console.error('Error deleting message:', error);
        // Reload messages if deletion fails
        loadMessages();
        alert('Failed to delete message. Please try again.');
      }
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) {
      alert('Please enter a reply message');
      return;
    }

    setReplying(true);
    try {
      const replyData = {
        reply: replyText,
        sender_role: 'student',
        sender_name: DEMO_STUDENT.name,
        sender_id: 'student_' + DEMO_STUDENT.enrollmentNo
      };

      const response = await messageService.replyToMessage(selectedMessage.id, replyData);
      
      if (response.success) {
        // Update the selected message with the new reply
        const updatedMessage = messageService.formatMessageForDisplay(response.data);
        setSelectedMessage(updatedMessage);
        setReplyText('');
        alert('Reply sent successfully!');
      } else {
        throw new Error(response.message || 'Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply. Please try again.');
    } finally {
      setReplying(false);
    }
  };

  const handleComposeSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    
    try {
      // Prepare message data for API
      const messageData = {
        title: composeForm.title,
        message: composeForm.message,
        type: composeForm.type,
        sender_role: 'student',
        sender_name: DEMO_STUDENT.name,
        sender_id: 'student_' + DEMO_STUDENT.enrollmentNo, // Add sender_id as required by backend
        universityCode: 'GYAN001'
      };
      
      // Send message via API
      const response = await messageService.createMessage(messageData);
      
      if (response.success) {
        // Format the new message for display
        const newMessage = messageService.formatMessageForDisplay(response.data);
        
        // Add to local state
        setMessages([newMessage, ...messages]);
        
        // Reset form
        setComposeForm({ title: '', message: '', type: 'general' });
        setShowComposeForm(false);
        
        // Show success message
        alert('Message sent successfully!');
      } else {
        throw new Error(response.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleComposeChange = (e) => {
    setComposeForm({
      ...composeForm,
      [e.target.name]: e.target.value
    });
  };

  const filteredMessages = messages.filter(msg => {
    let matchesFilter = true;
    
    if (filterType === 'received') {
      matchesFilter = !msg.sent;
    } else if (filterType === 'sent') {
      matchesFilter = msg.sent;
    } else if (filterType !== 'all') {
      matchesFilter = msg.type === filterType;
    }
    
    const matchesSearch = msg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter(msg => !msg.read).length;

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Received', value: 'received' },
    { label: 'Sent', value: 'sent' },
    { label: 'Urgent', value: 'urgent' },
    { label: 'General', value: 'general' },
    { label: 'Query', value: 'query' },
    { label: 'Complaint', value: 'complaint' },
    { label: 'Feedback', value: 'feedback' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Messages</h1>
              <p className="text-gray-600">
                You have <span className="font-semibold text-blue-600">{unreadCount}</span> unread messages
              </p>
              {error && (
                <div className="mt-2 p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-sm">
                  {error}
                </div>
              )}
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <button
                onClick={() => setShowComposeForm(true)}
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaPlus className="mr-2" />
                Send Message
              </button>
              <span className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                <FaEnvelope className="mr-2" />
                {unreadCount} New
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterType(filter.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterType === filter.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-900 text-white p-4">
              <h2 className="font-semibold">Inbox ({filteredMessages.length})</h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center text-gray-500">
                  <FaSpinner className="mx-auto text-4xl mb-2 animate-spin" />
                  <p>Loading messages...</p>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <FaEnvelope className="mx-auto text-4xl mb-2 opacity-50" />
                  <p>No messages found</p>
                </div>
              ) : (
                filteredMessages.map((message) => {
                  const { icon: Icon, color } = getMessageIcon(message.type);
                  return (
                    <div
                      key={message.id}
                      onClick={() => handleSelectMessage(message)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedMessage?.id === message.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                      } ${!message.read ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Icon className={`${color} flex-shrink-0`} />
                          {!message.read && !message.sent && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          )}
                          {message.sent && (
                            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {message.sent && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              Sent
                            </span>
                          )}
                          <span className="text-xs text-gray-500">{message.date}</span>
                        </div>
                      </div>
                      <h3 className={`text-sm mb-1 ${!message.read ? 'font-bold text-gray-900' : 'font-medium text-gray-800'}`}>
                        {message.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {message.message}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
            {selectedMessage ? (
              <div className="h-full flex flex-col">
                <div className="border-b border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      {(() => {
                        const { icon: Icon, color } = getMessageIcon(selectedMessage.type);
                        return <Icon className={`${color} text-2xl mt-1`} />;
                      })()}
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                          {selectedMessage.title}
                        </h2>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            {selectedMessage.date}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            selectedMessage.type === 'urgent' ? 'bg-red-100 text-red-700' :
                            selectedMessage.type === 'complaint' ? 'bg-yellow-100 text-yellow-700' :
                            selectedMessage.type === 'query' ? 'bg-blue-100 text-blue-700' :
                            selectedMessage.type === 'feedback' ? 'bg-green-100 text-green-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {messageService.getMessageTypeDisplay(selectedMessage.type)}
                          </span>
                          {selectedMessage.sent && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              Sent by You
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete message"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="prose max-w-none mb-6">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {selectedMessage.message}
                    </p>
                  </div>

                  {/* Replies Section */}
                  {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Replies ({selectedMessage.replies.length})</h3>
                      <div className="space-y-3">
                        {selectedMessage.replies.map((reply, index) => (
                          <div 
                            key={reply.id || index}
                            className={`p-4 rounded-lg border ${
                              reply.sender_role === 'student' 
                                ? 'bg-blue-50 border-blue-200' 
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <span className="font-semibold text-gray-800">{reply.sender_name}</span>
                                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                                  reply.sender_role === 'admin' 
                                    ? 'bg-purple-100 text-purple-700' 
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {reply.sender_role === 'admin' ? 'Admin' : 'You'}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">{reply.timestamp}</span>
                            </div>
                            <p className="text-gray-700">{reply.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 p-6 bg-gray-50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {selectedMessage.read ? (
                        <>
                          <FaEnvelopeOpen className="text-gray-400" />
                          <span className="text-sm text-gray-600">Read</span>
                        </>
                      ) : (
                        <>
                          <FaEnvelope className="text-blue-600" />
                          <span className="text-sm text-blue-600 font-medium">New</span>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                    >
                      <FaTrash className="mr-2" />
                      Delete Message
                    </button>
                  </div>

                  {/* Reply Form */}
                  <form onSubmit={handleReplySubmit} className="space-y-3">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply here..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      maxLength={1000}
                      required
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{replyText.length}/1000 characters</span>
                      <button
                        type="submit"
                        disabled={replying || !replyText.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {replying ? (
                          <>
                            <FaSpinner className="mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="mr-2" />
                            Send Reply
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-12 text-center">
                <div>
                  <FaEnvelope className="mx-auto text-6xl text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No Message Selected
                  </h3>
                  <p className="text-gray-500">
                    Select a message from the list to view its contents
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Important messages from the university will be sent here. 
            Please check your messages regularly to stay updated with announcements, 
            examination schedules, and other important information.
          </p>
        </div>
      </div>

      {/* Compose Message Modal */}
      {showComposeForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Send Message to Administration
                </h3>
                <button
                  onClick={() => setShowComposeForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleComposeSubmit} className="space-y-6">
                {/* Message Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Type
                  </label>
                  <select
                    name="type"
                    value={composeForm.type}
                    onChange={handleComposeChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="general">General</option>
                    <option value="query">Query</option>
                    <option value="complaint">Complaint</option>
                    <option value="feedback">Feedback</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={composeForm.title}
                    onChange={handleComposeChange}
                    placeholder="Enter message subject..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    maxLength={200}
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={composeForm.message}
                    onChange={handleComposeChange}
                    rows={6}
                    placeholder="Enter your message..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    maxLength={1000}
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {composeForm.message.length}/1000 characters
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowComposeForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMessage;
