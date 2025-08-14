
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brandBlue to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Arizona GLF</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Arizona Global Logistics & Freight has been serving businesses across the Southwest with reliable, 
            efficient transportation and logistics solutions for over a decade.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Founded in Arizona with a vision to revolutionize freight and logistics, Arizona GLF has grown 
                from a small local operation to a trusted partner for businesses across the region. Our commitment 
                to excellence and customer satisfaction drives everything we do.
              </p>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                We understand that your cargo is more than just freight – it's your business, your reputation, 
                and your customer's trust. That's why we treat every shipment with the care and attention it deserves.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brandBlue mb-2">10+</div>
                  <div className="text-gray-600">Years of Service</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brandBlue mb-2">500+</div>
                  <div className="text-gray-600">Happy Clients</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To provide exceptional logistics and freight services that enable our clients to focus on 
                growing their businesses while we handle their transportation needs with precision and care.
              </p>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the Southwest's most trusted logistics partner, known for reliability, innovation, 
                and unwavering commitment to customer success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core principles guide our operations and define who we are as a company.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-brandBlue rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Reliability</h3>
              <p className="text-gray-600">
                We deliver on our promises with consistent, dependable service you can count on.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-brandBlue rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We embrace technology and new methods to improve efficiency and service quality.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-brandBlue rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Integrity</h3>
              <p className="text-gray-600">
                We conduct business with honesty, transparency, and respect for all stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the experienced professionals who lead Arizona GLF with passion and expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">John Smith</h3>
              <p className="text-brandBlue mb-2">Chief Executive Officer</p>
              <p className="text-gray-600 text-sm">
                20+ years in logistics and transportation management
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Johnson</h3>
              <p className="text-brandBlue mb-2">Operations Director</p>
              <p className="text-gray-600 text-sm">
                Expert in supply chain optimization and logistics solutions
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mike Rodriguez</h3>
              <p className="text-brandBlue mb-2">Fleet Manager</p>
              <p className="text-gray-600 text-sm">
                Ensures safety and efficiency across our entire fleet
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
