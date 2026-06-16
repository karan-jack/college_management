import React, { useState } from 'react';
import Dashboard from './pages/Dashboard.js';
import AcademicRecords from './pages/AcademicRecords.js';
import BrowseCourses from './pages/BrowseCourses.js';
import LearningPaths from './pages/LearningPaths.js';
import MyLearning from './pages/MyLearning.js';
import Leaderboard from './pages/Leaderboard.js';
import Badges from './pages/Badges.js';

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
