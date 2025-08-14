
import React, { useState, useEffect } from 'react';

interface Client {
  id: number;
  name: string;
  email: string;
  company: string;
  joinDate: string;
  status: 'active' | 'inactive';
  totalFiles: number;
}

interface AdminMessage {
  id: number;
  clientName: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

interface AdminFile {
  id: number;
  name: string;
  clientId: number;
  clientName: string;
  size: string;
  uploadDate: string;
  type: string;
}

const AdminDashboard: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [files, setFiles] = useState<AdminFile[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'files' | 'messages'>('overview');
  const [selectedClient, setSelectedClient] = useState<number | null>(null);

  // Mock data - replace with actual API calls
  useEffect(() => {
    setClients([
      { id: 1, name: 'John Smith', email: 'john@company.com', company: 'ABC Corp', joinDate: '2024-01-01', status: 'active', totalFiles: 5 },
      { id: 2, name: 'Jane Doe', email: 'jane@business.com', company: 'XYZ Ltd', joinDate: '2024-01-02', status: 'active', totalFiles: 3 },
      { id: 3, name: 'Bob Johnson', email: 'bob@enterprise.com', company: 'Enterprise Inc', joinDate: '2024-01-03', status: 'inactive', totalFiles: 2 }
    ]);

    setMessages([
      { id: 1, clientName: 'John Smith', subject: 'Delivery Question', message: 'When will my shipment arrive?', date: '2024-01-15', isRead: false },
      { id: 2, clientName: 'Jane Doe', subject: 'Invoice Query', message: 'I need a copy of last month\'s invoice.', date: '2024-01-14', isRead: true }
    ]);

    setFiles([
      { id: 1, name: 'Invoice_001.pdf', clientId: 1, clientName: 'John Smith', size: '2.3 MB', uploadDate: '2024-01-15', type: 'PDF' },
      { id: 2, name: 'Manifest.xlsx', clientId: 2, clientName: 'Jane Doe', size: '1.8 MB', uploadDate: '2024-01-14', type: 'Excel' }
    ]);
  }, []);

  const handleClientStatusToggle = (clientId: number) => {
    setClients(prev => 
      prev.map(client => 
        client.id === clientId 
          ? { ...client, status: client.status === 'active' ? 'inactive' : 'active' }
          : client
      )
    );
  };

  const handleFileUploadToClient = (clientId: number) => {
    // Create file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.xlsx,.jpg,.png';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const client = clients.find(c => c.id === clientId);
        const newFile: AdminFile = {
          id: Date.now(),
          name: file.name,
          clientId,
          clientName: client?.name || 'Unknown',
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Image' : 'Document'
        };
        setFiles(prev => [newFile, ...prev]);
        alert(`File uploaded to ${client?.name}'s directory successfully!`);
      }
    };
    input.click();
  };

  const stats = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'active').length,
    totalFiles: files.length,
    unreadMessages: messages.filter(m => !m.isRead).length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage clients, files, and communications</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Admin: Super User</p>
              <p className="text-sm text-gray-500">Last Login: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-brandBlue rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalClients}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeClients}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Files</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalFiles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.unreadMessages}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'overview', label: 'Overview', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                { key: 'clients', label: 'Clients', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' },
                { key: 'files', label: 'Files', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                { key: 'messages', label: 'Messages', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.key
                      ? 'border-brandBlue text-brandBlue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">New client registered</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">File uploaded by John Smith</p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Server Status</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Online</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Database</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Email Service</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Client Management</h2>
                <button className="bg-brandBlue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Add New Client
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Company</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Join Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">{client.name}</td>
                        <td className="py-3 px-4">{client.company}</td>
                        <td className="py-3 px-4">{client.email}</td>
                        <td className="py-3 px-4">{client.joinDate}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            client.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {client.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleFileUploadToClient(client.id)}
                              className="text-brandBlue hover:text-blue-700"
                              title="Upload File"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => handleClientStatusToggle(client.id)}
                              className="text-yellow-600 hover:text-yellow-700"
                              title="Toggle Status"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                            </button>
                            <button className="text-red-500 hover:text-red-700" title="Delete">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">File Management</h2>
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
                        <p className="text-sm text-gray-600">Client: {file.clientName} • {file.size} • {file.uploadDate}</p>
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
          )}

          {activeTab === 'messages' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Client Messages</h2>
              <div className="space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`p-4 rounded-lg ${
                    message.isRead ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-brandBlue'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`font-medium ${message.isRead ? 'text-gray-900' : 'text-brandBlue'}`}>
                          {message.subject}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">From: {message.clientName}</p>
                        <p className="text-sm text-gray-600 mt-2">{message.message}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500">{message.date}</span>
                        <div className="flex space-x-2 mt-2">
                          <button className="text-brandBlue hover:text-blue-700 text-sm">Reply</button>
                          <button className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
