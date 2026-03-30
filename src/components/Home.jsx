import React from 'react';
import { topics } from '../data/topics';

export default function Home({ onSelectTopic }) {
  return (
    <div className="container animate-fade-in">
      <div className="app-header">
        <h1>Smart Study Assistant</h1>
        <p>Master Data Analysis concepts with interactive quizzes</p>
      </div>

      <div className="topics-grid">
        {topics.map((topic) => (
          <div 
            key={topic.id} 
            className="topic-card"
            onClick={() => onSelectTopic(topic.id)}
          >
            <h3>{topic.title}</h3>
            <p>{topic.explanation.substring(0, 80)}...</p>
            <div className="topic-card-footer">
              <span>{topic.questions.length} Questions</span>
              <span>Start Learning &rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
