import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, User, Bell, BarChart3, Users } from 'lucide-react';
import NotificationCenter from './NotificationCenter';

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">HEXAWARE</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/continue-learning"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/continue-learning') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Continue Learning
              </Link>
              <Link
                to="/explore-courses"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/explore-courses') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Explore Courses
              </Link>
              <Link
                to="/skill-assessment"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/skill-assessment') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Skill Assessment
              </Link>
              <Link
                to="/progress"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/progress') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Progress
              </Link>
              <Link
                to="/study-groups"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/study-groups') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Study Groups
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <NotificationCenter />
            <Link 
              to="/profile"
              className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">John Doe</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;