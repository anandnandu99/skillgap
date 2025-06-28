import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/continue-learning" element={<ContinueLearning />} />
          <Route path="/explore-courses" element={<ExploreCourses />} />
          <Route path="/skill-assessment" element={<SkillAssessment />} />
          <Route path="/assessment/:id" element={<AssessmentDetail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/course/:id" element={<CourseDetail courseId="1" />} />
          <Route path="/quiz/:id" element={<InteractiveQuiz />} />
          <Route path="/progress" element={<ProgressTracker />} />
          <Route path="/study-groups" element={<StudyGroups />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;