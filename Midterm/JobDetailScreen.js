import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

const JobDetailScreen = () => {
  const { state } = useLocation();
  const { job } = state || {};
  const navigate = useNavigate();

  if (!job) return <div>No job selected</div>;

  const jobDetails = {
    ...job,
    salary: '$120,000 - $150,000/year',
    jobType: 'Full-time',
    experienceLevel: 'Mid-Senior',
    postedDate: 'March 20, 2025',
    description: `Join ${job.company} as a ${job.title} to work on exciting projects in ${job.location}.`,
    requirements: '• 5+ years experience\n• Relevant degree\n• Problem-solving skills',
    benefits: '• Health insurance\n• 401(k)\n• Remote work',
  };

  return (
    <div className="container">
      <h2 className="title">{jobDetails.title}</h2>
      <div className="section">
        <h3>Company Information</h3>
        <p>Company: {jobDetails.company}</p>
        <p>Location: {jobDetails.location}</p>
      </div>
      <div className="section">
        <h3>Job Details</h3>
        <p>Salary: {jobDetails.salary}</p>
        <p>Job Type: {jobDetails.jobType}</p>
        <p>Experience: {jobDetails.experienceLevel}</p>
        <p>Posted: {jobDetails.postedDate}</p>
      </div>
      <div className="section">
        <h3>Description</h3>
        <p>{jobDetails.description}</p>
      </div>
      <div className="section">
        <h3>Requirements</h3>
        <p style={{ whiteSpace: 'pre-line' }}>{jobDetails.requirements}</p>
      </div>
      <div className="section">
        <h3>Benefits</h3>
        <p style={{ whiteSpace: 'pre-line' }}>{jobDetails.benefits}</p>
      </div>
      <button className="button" onClick={() => navigate('/jobs')}>
        Back to Jobs
      </button>
    </div>
  );
};

export default JobDetailScreen;