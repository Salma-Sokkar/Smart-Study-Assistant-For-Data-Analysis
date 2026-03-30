import React from 'react';

export default function QuizResults({ topic, results, onRetry, onBackHome }) {
  const correctCount = results.filter(r => r.isCorrect).length;
  const scorePercentage = Math.round((correctCount / results.length) * 100);
  
  let message = "";
  if (scorePercentage === 100) message = "Perfect Score! You're an expert.";
  else if (scorePercentage >= 80) message = "Great job! You really know your stuff.";
  else if (scorePercentage >= 60) message = "Good effort, but there's room for improvement.";
  else message = "Keep studying! You'll get it next time.";

  return (
    <div className="results-container animate-fade-in">
      <div className="score-card">
        <h2>{topic.title} - Quiz Complete</h2>
        <div className="score-display">{scorePercentage}%</div>
        <p className="score-message">
          You got {correctCount} out of {results.length} correct.
          <br />
          {message}
        </p>
      </div>

      <div className="review-section">
        <h3>Question Review</h3>
        {results.map((result, index) => (
          <div key={index} className="review-item">
            <div className="review-header">
              <div className={`status-icon ${result.isCorrect ? 'correct' : 'wrong'}`}>
                {result.isCorrect ? '✓' : '✗'}
              </div>
              <div className="review-q">{result.question.text}</div>
            </div>
            
            <div className="review-details">
              <p>
                Your Answer: <span className={`user-ans ${!result.isCorrect ? 'wrong' : ''}`}>
                  {result.userAnswer}
                </span>
              </p>
              {!result.isCorrect && (
                <p>
                  Correct Answer: <span className="correct-ans">{result.question.correctAnswerText}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="results-actions">
        <button className="btn-secondary" onClick={onRetry}>
          Retry Quiz
        </button>
        <button className="btn-primary" onClick={onBackHome}>
          Back to Topics
        </button>
      </div>
    </div>
  );
}
