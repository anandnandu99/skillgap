import React, { useState } from 'react';
import { Play, Clock, Users, Star, BookOpen, CheckCircle, Lock, Download, MessageCircle, Share2 } from 'lucide-react';

interface CourseDetailProps {
  courseId: string;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ courseId }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [enrollmentStatus, setEnrollmentStatus] = useState('not-enrolled'); // not-enrolled, enrolled, completed

  // Mock course data - in real app, this would come from API
  const course = {
    id: courseId,
    title: 'Advanced Machine Learning with Python',
    instructor: 'Dr. Sarah Chen',
    rating: 4.9,
    students: 12500,
    duration: '8 weeks',
    level: 'Advanced',
    category: 'Data Science',
    price: 149,
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Master advanced machine learning algorithms and techniques for real-world applications. This comprehensive course covers deep learning, neural networks, and practical implementation using Python.',
    learningObjectives: [
      'Understand advanced ML algorithms and their applications',
      'Implement neural networks from scratch using Python',
      'Work with real-world datasets and preprocessing techniques',
      'Deploy ML models to production environments',
      'Optimize model performance and handle large-scale data'
    ],
    prerequisites: [
      'Basic Python programming knowledge',
      'Understanding of statistics and linear algebra',
      'Familiarity with basic machine learning concepts'
    ],
    syllabus: [
      {
        week: 1,
        title: 'Introduction to Advanced ML',
        lessons: [
          { id: 1, title: 'Course Overview and Setup', duration: '15 min', type: 'video', completed: true },
          { id: 2, title: 'Advanced ML Landscape', duration: '25 min', type: 'video', completed: true },
          { id: 3, title: 'Python Environment Setup', duration: '20 min', type: 'hands-on', completed: false }
        ]
      },
      {
        week: 2,
        title: 'Deep Learning Fundamentals',
        lessons: [
          { id: 4, title: 'Neural Network Architecture', duration: '30 min', type: 'video', completed: false },
          { id: 5, title: 'Backpropagation Algorithm', duration: '35 min', type: 'video', completed: false },
          { id: 6, title: 'Building Your First Neural Network', duration: '45 min', type: 'hands-on', completed: false }
        ]
      },
      {
        week: 3,
        title: 'Convolutional Neural Networks',
        lessons: [
          { id: 7, title: 'CNN Architecture', duration: '25 min', type: 'video', completed: false },
          { id: 8, title: 'Image Classification Project', duration: '60 min', type: 'project', completed: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        user: 'Alex Johnson',
        rating: 5,
        comment: 'Excellent course! The instructor explains complex concepts very clearly.',
        date: '2024-01-15'
      },
      {
        id: 2,
        user: 'Maria Garcia',
        rating: 4,
        comment: 'Great content, but could use more practical examples.',
        date: '2024-01-10'
      }
    ]
  };

  const handleEnroll = () => {
    setEnrollmentStatus('enrolled');
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'instructor', label: 'Instructor' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Course Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                {course.category}
              </span>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                {course.level}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.description}</p>
            
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-medium">{course.rating}</span>
                <span className="text-gray-600">({course.students.toLocaleString()} students)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">{course.duration}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {enrollmentStatus === 'not-enrolled' ? (
                <button
                  onClick={handleEnroll}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Enroll Now - ${course.price}
                </button>
              ) : (
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Continue Learning</span>
                </button>
              )}
              <button className="border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
              <button className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all">
                <Play className="w-8 h-8 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">What You'll Learn</h3>
                    <ul className="space-y-2">
                      {course.learningObjectives.map((objective, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Prerequisites</h3>
                    <ul className="space-y-2">
                      {course.prerequisites.map((prerequisite, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <BookOpen className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{prerequisite}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-6">
                  {course.syllabus.map((week) => (
                    <div key={week.week} className="border border-gray-200 rounded-lg">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h3 className="font-medium text-gray-900">
                          Week {week.week}: {week.title}
                        </h3>
                      </div>
                      <div className="p-4 space-y-3">
                        {week.lessons.map((lesson) => (
                          <div key={lesson.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {lesson.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : enrollmentStatus === 'enrolled' ? (
                                <Play className="w-5 h-5 text-blue-500" />
                              ) : (
                                <Lock className="w-5 h-5 text-gray-400" />
                              )}
                              <span className={`${lesson.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                {lesson.title}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                lesson.type === 'video' ? 'bg-blue-100 text-blue-800' :
                                lesson.type === 'hands-on' ? 'bg-green-100 text-green-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {lesson.type}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Student Reviews</h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Write Review
                    </button>
                  </div>
                  <div className="space-y-4">
                    {course.reviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{review.user}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">SC</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.instructor}</h3>
                      <p className="text-gray-600">Senior Data Scientist & ML Engineer</p>
                      <p className="text-gray-700 mt-2">
                        Dr. Sarah Chen has over 10 years of experience in machine learning and data science. 
                        She has worked at leading tech companies and has published numerous research papers 
                        in the field of artificial intelligence.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Level</span>
                <span className="font-medium">{course.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Students</span>
                <span className="font-medium">{course.students.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Language</span>
                <span className="font-medium">English</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Certificate</span>
                <span className="font-medium">Yes</span>
              </div>
            </div>
          </div>

          {/* Course Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Course Includes</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700">24 hours of video content</span>
              </div>
              <div className="flex items-center space-x-2">
                <Download className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Downloadable resources</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-purple-500" />
                <span className="text-gray-700">Discussion forum access</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">Completion certificate</span>
              </div>
            </div>
          </div>

          {/* Related Courses */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Courses</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex space-x-3">
                  <img 
                    src={`https://images.pexels.com/photos/${574071 + i}/pexels-photo-${574071 + i}.jpeg?auto=compress&cs=tinysrgb&w=100`}
                    alt="Course"
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Python for Data Science</h4>
                    <p className="text-xs text-gray-600">Dr. Mike Johnson</p>
                    <p className="text-xs text-blue-600">$99</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;