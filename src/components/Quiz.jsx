import React, { useState, useEffect } from 'react';

// Helper to shuffle array
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Quiz({ topic, onFinishQuiz }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    // Select 5 random questions
    if (topic && topic.questions) {
      const shuffled = shuffleArray(topic.questions);
      setQuestions(shuffled.slice(0, 5));
    }
  }, [topic]);

  if (questions.length === 0) return <div>Loading...</div>;

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (option) => {
    if (isAnswerRevealed) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;

    setUserAnswers(prev => [...prev, {
      question: currentQuestion,
      userAnswer: selectedOption,
      isCorrect: selectedOption === currentQuestion.correctAnswerText
    }]);

    setIsAnswerRevealed(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      onFinishQuiz(userAnswers);
    }
  };

  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="quiz-container animate-fade-in">
      <div className="quiz-header">
        <h2>{topic.title} - Quiz</h2>
        <span className="question-counter">Question {currentIndex + 1} of {questions.length}</span>
      </div>

      <div className="question-card">
        <h3 className="question-text">{currentQuestion.text}</h3>
        
        <div className="options-grid">
          {currentQuestion.options.map((option, index) => {
            let btnClass = "option-btn";
            
            if (isAnswerRevealed) {
              if (option === currentQuestion.correctAnswerText) {
                btnClass += " correct";
              } else if (option === selectedOption && option !== currentQuestion.correctAnswerText) {
                btnClass += " wrong";
              }
            } else if (selectedOption === option) {
              btnClass += " selected";
            }

            return (
              <button
                key={index}
                className={btnClass}
                onClick={() => handleSelectOption(option)}
                disabled={isAnswerRevealed}
              >
                {option}
              </button>
            );
          })}
        </div>

        {isAnswerRevealed && (
          <div className={`feedback-message ${selectedOption === currentQuestion.correctAnswerText ? 'correct' : 'wrong'}`}>
            {selectedOption === currentQuestion.correctAnswerText ? 'Correct!' : 'Incorrect.'}
          </div>
        )}
      </div>

      <div className="quiz-footer">
        {!isAnswerRevealed ? (
          <button 
            className="btn-primary" 
            onClick={handleSubmitAnswer}
            disabled={!selectedOption}
          >
            Submit Answer
          </button>
        ) : (
          <button className="btn-primary" onClick={handleNextQuestion}>
            {isLastQuestion ? 'View Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
}
