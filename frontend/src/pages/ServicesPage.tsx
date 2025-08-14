
import React from 'react';
import { Link } from 'react-router-dom';

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brandBlue to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive logistics solutions designed to meet your unique business requirements 
            and drive your success forward.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-brandBlue rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Freight Transportation</h2>
              <p className="text-gray-600 mb-6 text-lg">
                Reliable freight transportation services across Arizona and neighboring states with 
                both Full Truckload (FTL) and Less Than Truckload (LTL) options.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brandBlue mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Full Truckload (FTL) Services
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brandBlue mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Less Than Truckload (LTL)
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brandBlue mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Expedited Shipping
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brandBlue mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Real-time Tracking
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-brandBlue rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Warehousing Solutions</h2>
              <p className="text-gray-600 mb-6 text-lg">
                Secure, climate-controlled storage facilities with comprehensive inventory management 
                and distribution services to support your supply chain.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brandBlue mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Climate-Controlled Storage
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brandBlue mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Inventory Management
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brandBlue mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Distribution Services
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-brandBlue mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24/7 Security Monitoring
                </li>
              </ul>
            </div>
          </div>

          {/* Additional Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Supply Chain Management</h4>
              <p className="text-gray-600 text-sm mb-4">
                End-to-end supply chain optimization and consulting services.
              </p>
              <Link to="/contact" className="text-brandBlue hover:text-blue-700 font-medium text-sm">
                Learn More →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Cross-Docking</h4>
              <p className="text-gray-600 text-sm mb-4">
                Efficient transfer of goods directly from inbound to outbound transportation.
              </p>
              <Link to="/contact" className="text-brandBlue hover:text-blue-700 font-medium text-sm">
                Learn More →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Specialized Transport</h4>
              <p className="text-gray-600 text-sm mb-4">
                Handling of oversized, hazardous, or temperature-sensitive cargo.
              </p>
              <Link to="/contact" className="text-brandBlue hover:text-blue-700 font-medium text-sm">
                Learn More →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Logistics Consulting</h4>
              <p className="text-gray-600 text-sm mb-4">
                Strategic planning to optimize your transportation and logistics operations.
              </p>
              <Link to="/contact" className="text-brandBlue hover:text-blue-700 font-medium text-sm">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Innovation */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technology & Innovation</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Leveraging cutting-edge technology to provide transparency, efficiency, and superior service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-brandBlue rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-Time Tracking</h3>
              <p className="text-gray-600">
                Monitor your shipments in real-time with our advanced GPS tracking system and customer portal.
              </p>
            </div>

            <div className="text-center bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-brandBlue rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Automated Dispatch</h3>
              <p className="text-gray-600">
                Our intelligent dispatch system optimizes routes and reduces delivery times while minimizing costs.
              </p>
            </div>

            <div className="text-center bg-white p-8 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-brandBlue rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Digital Documentation</h3>
              <p className="text-gray-600">
                Paperless processes with electronic bills of lading, proof of delivery, and digital invoicing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brandBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Optimize Your Logistics?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our comprehensive services can streamline your operations and reduce costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-brandGold text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition-colors duration-200 text-lg"
            >
              Request Quote
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-brandBlue transition-colors duration-200 text-lg"
            >
              Client Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
