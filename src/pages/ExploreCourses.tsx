import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Users, BookOpen, Sparkles } from 'lucide-react';

const ExploreCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'development', name: 'Development' },
    { id: 'design', name: 'Design' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'cloud', name: 'Cloud Computing' },
    { id: 'security', name: 'Cybersecurity' },
    { id: 'mobile', name: 'Mobile Development' }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Advanced Machine Learning with Python',
      instructor: 'Dr. Sarah Chen',
      rating: 4.9,
      students: 12500,
      duration: '8 weeks',
      level: 'advanced',
      category: 'data-science',
      price: 149,
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master advanced ML algorithms and techniques for real-world applications',
      tags: ['Python', 'TensorFlow', 'Deep Learning']
    },
    {
      id: 2,
      title: 'React Native Mobile App Development',
      instructor: 'Mike Johnson',
      rating: 4.7,
      students: 8900,
      duration: '6 weeks',
      level: 'intermediate',
      category: 'mobile',
      price: 129,
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Build cross-platform mobile apps with React Native',
      tags: ['React Native', 'JavaScript', 'Mobile']
    },
    {
      id: 3,
      title: 'AWS Cloud Architecture Mastery',
      instructor: 'David Kumar',
      rating: 4.8,
      students: 15200,
      duration: '10 weeks',
      level: 'intermediate',
      category: 'cloud',
      price: 199,
      thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Design and implement scalable cloud solutions on AWS',
      tags: ['AWS', 'Cloud Architecture', 'DevOps']
    },
    {
      id: 4,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emma Wilson',
      rating: 4.6,
      students: 6800,
      duration: '4 weeks',
      level: 'beginner',
      category: 'design',
      price: 89,
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn the principles of user-centered design',
      tags: ['Figma', 'Design Thinking', 'Prototyping']
    },
    {
      id: 5,
      title: 'Cybersecurity Threat Detection',
      instructor: 'Robert Lee',
      rating: 4.7,
      students: 4500,
      duration: '12 weeks',
      level: 'advanced',
      category: 'security',
      price: 299,
      thumbnail: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Advanced techniques for identifying and mitigating security threats',
      tags: ['Network Security', 'Threat Analysis', 'Incident Response']
    },
    {
      id: 6,
      title: 'Full Stack JavaScript Development',
      instructor: 'Lisa Zhang',
      rating: 4.8,
      students: 11200,
      duration: '14 weeks',
      level: 'intermediate',
      category: 'development',
      price: 179,
      thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Complete MERN stack development from frontend to backend',
      tags: ['React', 'Node.js', 'MongoDB', 'Express']
    }
  ];

  const handleAiSearch = (query: string) => {
    // Simulate AI-powered search suggestions
    const suggestions = [
      'Machine Learning for Beginners',
      'Advanced React Patterns',
      'Cloud Security Best Practices',
      'Data Visualization with D3.js',
      'Mobile App Performance Optimization'
    ];
    
    if (query.length > 2) {
      setAiSuggestions(suggestions.filter(s => 
        s.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setAiSuggestions([]);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Courses</h1>
        <p className="text-gray-600">Discover new skills with AI-powered course recommendations</p>
      </div>

      {/* AI-Powered Search Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8">
        <div className="flex items-center mb-4">
          <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">AI-Powered Course Search</h2>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Ask AI to find courses based on your needs (e.g., 'I want to learn machine learning for finance')"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleAiSearch(e.target.value);
            }}
          />
        </div>
        
        {aiSuggestions.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">AI Suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(suggestion)}
                  className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm hover:bg-blue-50 transition-colors border border-blue-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {levels.map(level => (
              <option key={level.id} value={level.id}>{level.name}</option>
            ))}
          </select>

          <div className="ml-auto text-sm text-gray-600">
            {filteredCourses.length} courses found
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative overflow-hidden">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className={`absolute top-4 left-4 px-2 py-1 rounded text-xs font-medium text-white ${
                course.level === 'beginner' ? 'bg-green-500' :
                course.level === 'intermediate' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}>
                {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
              </span>
              <span className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm font-medium">
                ${course.price}
              </span>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
              <p className="text-sm text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {course.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Enroll Now
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <BookOpen className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all courses</p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLevel('all');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* AI Recommendations Section */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
        <div className="flex items-center mb-6">
          <Sparkles className="w-6 h-6 text-purple-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">AI Recommendations for You</h2>
        </div>
        <p className="text-gray-600 mb-6">Based on your learning history and career goals</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((course) => (
            <div key={`ai-${course.id}`} className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex items-start space-x-3">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">{course.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">by {course.instructor}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span>{course.rating}</span>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-3 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                View Course
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;