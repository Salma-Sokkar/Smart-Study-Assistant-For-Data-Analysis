import React from 'react';

export default function TopicDetails({ topic, onBack, onStartQuiz }) {
  if (!topic) return null;

  return (
    <div className="container animate-fade-in">
      <div className="nav-bar">
        <button className="back-button" onClick={onBack}>
          &larr; Back to Topics
        </button>
      </div>

      <div className="topic-details-header">
        <h2>{topic.title}</h2>
        <p>{topic.explanation}</p>
      </div>

      <h3>Key Concepts</h3>
      <div className="key-points-grid">
        {topic.keyPoints.map((point, index) => (
          <div key={index} className="key-point-card">
            <h4>{point.title}</h4>
            <p>{point.description}</p>
          </div>
        ))}
      </div>

      <div className="start-quiz-section">
        <h3>Ready to test your knowledge?</h3>
        <p>Take a 5-question interactive quiz from a bank of {topic.questions.length} questions.</p>
        <button 
          className="btn-primary" 
          onClick={onStartQuiz}
          style={{ marginTop: '1rem', fontSize: '1.125rem', padding: '1rem 2rem' }}
        >
          Start Quiz Now
        </button>
      </div>
    </div>
  );
}
