
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface FileItem {
  id: number;
  name: string;
  size: string;
  uploadDate: string;
  type: string;
}

interface Message {
  id: number;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

const ClientDashboard: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [newMessage, setNewMessage] = useState({
    subject: '',
    message: ''
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate loading client files
    setFiles([
      { id: 1, name: 'Invoice_2024_001.pdf', size: '2.3 MB', uploadDate: '2024-01-15', type: 'PDF' },
      { id: 2, name: 'Shipping_Manifest.xlsx', size: '1.8 MB', uploadDate: '2024-01-14', type: 'Excel' },
      { id: 3, name: 'Delivery_Receipt.jpg', size: '856 KB', uploadDate: '2024-01-13', type: 'Image' }
    ]);

    // Simulate loading messages
    setMessages([
      { id: 1, subject: 'Shipment Update', message: 'Your shipment #12345 has been delivered successfully.', date: '2024-01-15', isRead: false },
      { id: 2, subject: 'New Service Available', message: 'We are excited to announce our new expedited shipping service.', date: '2024-01-14', isRead: true }
    ]);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            // Add file to list
            const newFile: FileItem = {
              id: Date.now(),
              name: file.name,
              size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
              uploadDate: new Date().toISOString().split('T')[0],
              type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Image' : 'Document'
            };
            setFiles(prev => [newFile, ...prev]);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call
    console.log('Sending message:', newMessage);
    alert('Message sent successfully!');
    setNewMessage({ subject: '', message: '' });
  };

  const markAsRead = (messageId: number) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isRead: true } : msg
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back! Manage your files and communications here.</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Client ID: #12345</p>
              <p className="text-sm text-gray-500">Last Login: Jan 15, 2024</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-brandBlue rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Files</p>
                <p className="text-2xl font-semibold text-gray-900">{files.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Shipments</p>
                <p className="text-2xl font-semibold text-gray-900">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                <p className="text-2xl font-semibold text-gray-900">{messages.filter(m => !m.isRead).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-semibold text-gray-900">$4,250</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* File Management */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">My Files</h2>
              <label className="bg-brandBlue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload File
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.xlsx,.jpg,.png"
                />
              </label>
            </div>

            {isUploading && (
              <div className="mb-4">
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-brandBlue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">Uploading... {uploadProgress}%</p>
              </div>
            )}

            <div className="space-y-3">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brandBlue rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-600">{file.size} • {file.uploadDate}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-brandBlue hover:text-blue-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Messages & Communication */}
          <div className="space-y-8">
            {/* Recent Messages */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Messages</h2>
              <div className="space-y-3">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      message.isRead ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-brandBlue'
                    }`}
                    onClick={() => markAsRead(message.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`font-medium ${message.isRead ? 'text-gray-900' : 'text-brandBlue'}`}>
                          {message.subject}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                      </div>
                      <span className="text-xs text-gray-500">{message.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Send Message */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Message</h2>
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue focus:border-transparent"
                    placeholder="Enter subject"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={newMessage.message}
                    onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandBlue focus:border-transparent"
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-brandBlue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
