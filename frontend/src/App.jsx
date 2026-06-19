import React, { useState } from 'react';
import Dashboard from './pages/Dashboard.jsx';
import AcademicRecords from './pages/AcademicRecords.jsx';
import BrowseCourses from './pages/BrowseCourses.jsx';
import LearningPaths from './pages/LearningPaths.jsx';
import MyLearning from './pages/MyLearning.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Badges from './pages/Badges.jsx';

export default function App() {
  const [page, setPage] = useState('dashboard');

  if (page === 'academic-records') {
    return <AcademicRecords currentPage={page} setPage={setPage} />;
  }

  if (page === 'browse-courses') {
    return <BrowseCourses currentPage={page} setPage={setPage} />;
  }

  if (page === 'learning-paths') {
    return <LearningPaths currentPage={page} setPage={setPage} />;
  }

  if (page === 'my-learning') {
    return <MyLearning currentPage={page} setPage={setPage} />;
  }

  if (page === 'leaderboard') {
    return <Leaderboard currentPage={page} setPage={setPage} />;
  }
  if (page === 'badges') {
    return <Badges currentPage={page} setPage={setPage} />;
  }
  return <Dashboard currentPage={page} setPage={setPage} />;
}
