import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Arizona <span className="text-brandBlue">GLF</span> Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your comprehensive business management platform with secure file sharing, 
            client dashboards, and administrative tools.
          </p>
          
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-brandBlue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border-2 border-brandBlue text-brandBlue px-8 py-3 rounded-lg font-semibold hover:bg-brandBlue hover:text-white transition-colors"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link
              to={user.role === 'admin' ? '/admin' : '/dashboard'}
              className="bg-brandBlue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Platform Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brandBlue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
              <p className="text-gray-600">
                Role-based access control with secure session management and CSRF protection.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brandBlue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">File Management</h3>
              <p className="text-gray-600">
                Upload, organize, and share files securely with clients and administrators.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brandBlue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Client Dashboards</h3>
              <p className="text-gray-600">
                Personalized dashboards with analytics, file access, and communication tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us today to learn more about the Arizona GLF platform.
          </p>
          <Link
            to="/contact"
            className="bg-brandGold text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
