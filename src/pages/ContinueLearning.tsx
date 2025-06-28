import React from 'react';
import { PlayCircle, Clock, CheckCircle, BookOpen, Award } from 'lucide-react';

const ContinueLearning = () => {
  const inProgressCourses = [
    {
      id: 1,
      title: 'Full Stack Development Mastery',
      progress: 68,
      totalLessons: 24,
      completedLessons: 16,
      estimatedTime: '3 weeks',
      category: 'Development',
      instructor: 'Sarah Johnson',
      thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Advanced React Patterns',
      progress: 45,
      totalLessons: 18,
      completedLessons: 8,
      estimatedTime: '2 weeks',
      category: 'Frontend',
      instructor: 'Mike Chen',
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Cloud Architecture Fundamentals',
      progress: 22,
      totalLessons: 30,
      completedLessons: 7,
      estimatedTime: '4 weeks',
      category: 'Cloud',
      instructor: 'David Kumar',
      thumbnail: 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const completedCourses = [
    {
      id: 4,
      title: 'JavaScript ES6+ Mastery',
      completedDate: '2024-01-15',
      score: 96,
      certificate: true,
      category: 'Programming',
      instructor: 'Emma Wilson',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      title: 'Database Design Principles',
      completedDate: '2024-01-08',
      score: 89,
      certificate: true,
      category: 'Database',
      instructor: 'Robert Lee',
      thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 6,
      title: 'API Development Best Practices',
      completedDate: '2023-12-22',
      score: 94,
      certificate: true,
      category: 'Backend',
      instructor: 'Lisa Zhang',
      thumbnail: 'https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const recentQuizzes = [
    {
      id: 1,
      title: 'React Hooks Quiz',
      score: 85,
      totalQuestions: 20,
      correctAnswers: 17,
      completedDate: '2024-01-18',
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      title: 'Node.js Fundamentals Quiz',
      score: 92,
      totalQuestions: 15,
      correctAnswers: 14,
      completedDate: '2024-01-16',
      difficulty: 'Beginner'
    },
    {
      id: 3,
      title: 'Database Optimization Quiz',
      score: 78,
      totalQuestions: 12,
      correctAnswers: 9,
      completedDate: '2024-01-14',
      difficulty: 'Advanced'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Continue Learning</h1>
        <p className="text-gray-600">Pick up where you left off and keep building your skills</p>
      </div>

      {/* Learning Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Courses in Progress</p>
              <p className="text-3xl font-bold">{inProgressCourses.length}</p>
            </div>
            <BookOpen className="w-10 h-10 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Completed Courses</p>
              <p className="text-3xl font-bold">{completedCourses.length}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Quizzes Taken</p>
              <p className="text-3xl font-bold">{recentQuizzes.length}</p>
            </div>
            <Award className="w-10 h-10 text-purple-200" />
          </div>
        </div>
      </div>

      {/* In Progress Courses */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue Your Courses</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {inProgressCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all">
                    <PlayCircle className="w-8 h-8 text-blue-600" />
                  </button>
                </div>
                <span className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {course.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{course.progress}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{width: `${course.progress}%`}}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{course.estimatedTime}</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Courses */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Courses</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {completedCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-500 rounded-full p-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="absolute top-4 left-4 bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium">
                  {course.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{course.score}%</p>
                      <p className="text-xs text-gray-600">Score</p>
                    </div>
                    {course.certificate && (
                      <div className="text-center">
                        <Award className="w-6 h-6 text-yellow-500 mx-auto" />
                        <p className="text-xs text-gray-600">Certified</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Completed {new Date(course.completedDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                    Review
                  </button>
                  {course.certificate && (
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Certificate
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Quizzes */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Quiz Results</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentQuizzes.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-lg font-bold ${quiz.score >= 90 ? 'text-green-600' : quiz.score >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {quiz.score}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {quiz.correctAnswers}/{quiz.totalQuestions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        quiz.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        quiz.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {quiz.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(quiz.completedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueLearning;