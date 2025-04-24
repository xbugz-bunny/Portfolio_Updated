import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const JobListScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchJobs = () => {
    setLoading(true);
    const mockJobs = [
      { id: '1', title: 'Software Engineer', company: 'TechCorp', location: 'New York' },
      { id: '2', title: 'Designer', company: 'DesignCo', location: 'San Francisco' },
      { id: '3', title: 'Product Manager', company: 'InnovateInc', location: 'Chicago' },
      { id: '4', title: 'Data Analyst', company: 'DataWorks', location: 'Boston' },
      { id: '5', title: 'DevOps Engineer', company: 'CloudSys', location: 'Seattle' },
    ];
    setJobs(mockJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div className="container">
      <h1 className="title">Job Listings</h1>
      <div className="job-list">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="job-item"
            onClick={() => navigate(`/job/${job.id}`, { state: { job } })}
          >
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
          </div>
        ))}
      </div>
      <button className="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default JobListScreen;