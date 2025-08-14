
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brandBlue to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Arizona's Premier
            <span className="block text-brandGold">Logistics Partner</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Delivering excellence in freight transportation and logistics solutions across Arizona and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="bg-brandGold text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition-colors duration-200 text-lg"
            >
              Our Services
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-brandBlue transition-colors duration-200 text-lg"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Arizona GLF?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with industry expertise to deliver unmatched logistics solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-brandBlue rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Fast & Reliable</h3>
              <p className="text-gray-600">
                On-time delivery with real-time tracking and 24/7 customer support to keep your business moving.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-brandBlue rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Secure & Safe</h3>
              <p className="text-gray-600">
                Your cargo is protected with comprehensive insurance and state-of-the-art security measures.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-brandBlue rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Cost Effective</h3>
              <p className="text-gray-600">
                Competitive pricing with transparent rates and no hidden fees. Get the best value for your logistics needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive logistics solutions tailored to meet your business requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Freight Transportation</h4>
              <p className="text-gray-600 text-sm">
                Full truckload and LTL freight services across Arizona and neighboring states.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Warehousing</h4>
              <p className="text-gray-600 text-sm">
                Secure storage solutions with inventory management and distribution services.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Supply Chain</h4>
              <p className="text-gray-600 text-sm">
                End-to-end supply chain optimization and logistics consulting services.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Specialized Transport</h4>
              <p className="text-gray-600 text-sm">
                Temperature-controlled and specialized equipment for unique cargo requirements.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="bg-brandBlue text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 text-lg"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brandBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and discover how Arizona GLF can optimize your logistics operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-brandGold text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition-colors duration-200 text-lg"
            >
              Get Free Quote
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-brandBlue transition-colors duration-200 text-lg"
            >
              Client Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
