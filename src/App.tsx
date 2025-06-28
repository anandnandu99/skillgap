import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ContinueLearning from './pages/ContinueLearning';
import ExploreCourses from './pages/ExploreCourses';
import SkillAssessment from './pages/SkillAssessment';
import UserProfile from './components/UserProfile';
import CourseDetail from './components/CourseDetail';
import InteractiveQuiz from './components/InteractiveQuiz';
import ProgressTracker from './components/ProgressTracker';
import StudyGroups from './components/StudyGroups';
import AssessmentDetail from './components/AssessmentDetail';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to false for testing auth flow
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@hexaware.com',
    role: 'Senior Developer'
  });

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser({ name: '', email: '', role: '' });
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegister={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/continue-learning" element={<ContinueLearning />} />
          <Route path="/explore-courses" element={<ExploreCourses />} />
          <Route path="/skill-assessment" element={<SkillAssessment />} />
          <Route path="/assessment/:id" element={<AssessmentDetail />} />
          <Route path="/profile" element={<UserProfile user={user} />} />
          <Route path="/course/:id" element={<CourseDetail courseId="1" />} />
          <Route path="/quiz/:id" element={<InteractiveQuiz />} />
          <Route path="/progress" element={<ProgressTracker />} />
          <Route path="/study-groups" element={<StudyGroups />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;