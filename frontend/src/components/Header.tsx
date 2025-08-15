
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b-4 border-brandBlue">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-brandBlue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">GLF</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brandBlue">Arizona GLF</h1>
              <p className="text-sm text-gray-600">Global Logistics & Freight</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-brandBlue transition-colors duration-200 font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-brandBlue transition-colors duration-200 font-medium">
              About
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-brandBlue transition-colors duration-200 font-medium">
              Services
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-brandBlue transition-colors duration-200 font-medium">
              Contact
            </Link>
            <Link to="/login" className="bg-brandBlue text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium">
              Client Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t">
            <div className="flex flex-col space-y-4 pt-4">
              <Link to="/" className="text-gray-700 hover:text-brandBlue transition-colors duration-200">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-brandBlue transition-colors duration-200">
                About
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-brandBlue transition-colors duration-200">
                Services
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-brandBlue transition-colors duration-200">
                Contact
              </Link>
              <Link to="/login" className="bg-brandBlue text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 text-center">
                Client Login
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-brandBlue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-brandBlue">Arizona GLF</h1>
              <p className="text-xs text-gray-600">Global Learning Foundation</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-brandBlue transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-brandBlue transition-colors">
              About
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-brandBlue transition-colors">
              Services
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-brandBlue transition-colors">
              Contact
            </Link>
            <Link to="/login" className="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-700 hover:text-brandBlue py-2">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-brandBlue py-2">
                About
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-brandBlue py-2">
                Services
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-brandBlue py-2">
                Contact
              </Link>
              <Link to="/login" className="bg-brandBlue text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-block text-center">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
