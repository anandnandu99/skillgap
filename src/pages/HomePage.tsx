import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Target, TrendingUp, Award, Clock, Users, CheckCircle, Star } from 'lucide-react';

const HomePage = () => {
  // Recent assessment activity
  const recentActivity = [
    {
      id: 1,
      type: 'assessment_completed',
      title: 'JavaScript Fundamentals Assessment',
      score: 85,
      status: 'passed',
      badge: 'JavaScript Foundation',
      timestamp: '2 hours ago',
      icon: '🏆'
    },
    {
      id: 2,
      type: 'course_completed',
      title: 'React Advanced Patterns',
      progress: 100,
      timestamp: '1 day ago',
      icon: '⚛️'
    },
    {
      id: 3,
      type: 'certificate_earned',
      title: 'Data Science Fundamentals',
      certificateId: 'CERT-DS-001',
      timestamp: '3 days ago',
      icon: '📊'
    },
    {
      id: 4,
      type: 'study_group_joined',
      title: 'Full Stack Developers Group',
      members: 156,
      timestamp: '5 days ago',
      icon: '👥'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Personalized Learning & Skill-Gap Analysis
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Leverage AI-powered multi-agent framework to deliver training that truly matches each employee's existing skills and evolving gaps.
        </p>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Courses Completed</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
              <p className="text-xs text-green-600">+3 this month</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Assessments Passed</p>
              <p className="text-2xl font-bold text-gray-900">10</p>
              <p className="text-xs text-green-600">83% success rate</p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Certificates Earned</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-xs text-blue-600">Verified credentials</p>
            </div>
            <Award className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Learning Streak</p>
              <p className="text-2xl font-bold text-gray-900">15 days</p>
              <p className="text-xs text-orange-600">Keep it up!</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Current Learning Path */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Learning Path</h2>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Full Stack Development Mastery</h3>
              <p className="text-gray-600">Advanced React, Node.js, and Database Management</p>
            </div>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              In Progress
            </span>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>68% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '68%'}}></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>Estimated completion: 3 weeks</span>
            </div>
            <Link 
              to="/continue-learning"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Continue Learning
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link to="/continue-learning" className="group">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Continue Learning</h3>
            <p className="text-gray-600 mb-4">Resume your courses and track your progress</p>
            <div className="flex items-center text-blue-600 font-medium">
              <span>View Progress</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        <Link to="/explore-courses" className="group">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Explore Courses</h3>
            <p className="text-gray-600 mb-4">Discover new courses with AI-powered recommendations</p>
            <div className="flex items-center text-green-600 font-medium">
              <span>Browse Catalog</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        <Link to="/skill-assessment" className="group">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Skill Assessment</h3>
            <p className="text-gray-600 mb-4">Test your knowledge and earn certificates</p>
            <div className="flex items-center text-purple-600 font-medium">
              <span>Start Assessment</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
          <Link to="/profile" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Activity →
          </Link>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="text-2xl">{activity.icon}</div>
              <div className="flex-1">
                {activity.type === 'assessment_completed' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900">Completed Assessment: {activity.title}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {activity.score}% - {activity.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Earned "{activity.badge}" badge</p>
                  </>
                )}
                {activity.type === 'course_completed' && (
                  <>
                    <p className="font-medium text-gray-900">Completed Course: {activity.title}</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-1">
                        <div className="bg-green-500 h-1 rounded-full" style={{width: `${activity.progress}%`}}></div>
                      </div>
                      <span className="text-sm text-green-600">{activity.progress}%</span>
                    </div>
                  </>
                )}
                {activity.type === 'certificate_earned' && (
                  <>
                    <p className="font-medium text-gray-900">Certificate Earned: {activity.title}</p>
                    <p className="text-sm text-gray-600">Certificate ID: {activity.certificateId}</p>
                  </>
                )}
                {activity.type === 'study_group_joined' && (
                  <>
                    <p className="font-medium text-gray-900">Joined Study Group: {activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.members} members</p>
                  </>
                )}
              </div>
              <div className="text-sm text-gray-500">{activity.timestamp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;