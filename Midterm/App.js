import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import JobListScreen from './JobListScreen';
import JobDetailScreen from './JobDetailScreen';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/jobs" element={<JobListScreen />} />
      <Route path="/job/:id" element={<JobDetailScreen />} />
    </Routes>
  );
}