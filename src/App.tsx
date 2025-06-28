import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ContinueLearning from './pages/ContinueLearning';
import ExploreCourses from './pages/ExploreCourses';
import SkillAssessment from './pages/SkillAssessment';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;