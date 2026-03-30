import React, { useState } from 'react';
import Home from './components/Home';
import TopicDetails from './components/TopicDetails';
import Quiz from './components/Quiz';
import QuizResults from './components/QuizResults';
import { topics } from './data/topics';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'details', 'quiz', 'results'
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [quizResults, setQuizResults] = useState([]);

  const currentTopic = topics.find(t => t.id === selectedTopicId);

  const navigateToHome = () => {
    setCurrentView('home');
    setSelectedTopicId(null);
    setQuizResults([]);
  };

  const navigateToTopic = (topicId) => {
    setSelectedTopicId(topicId);
    setCurrentView('details');
  };

  const startQuiz = () => {
    setCurrentView('quiz');
  };

  const finishQuiz = (results) => {
    setQuizResults(results);
    setCurrentView('results');
  };

  return (
    <div className="app-container">
      {currentView === 'home' && (
        <Home onSelectTopic={navigateToTopic} />
      )}
      
      {currentView === 'details' && (
        <TopicDetails 
          topic={currentTopic} 
          onBack={navigateToHome}
          onStartQuiz={startQuiz}
        />
      )}

      {currentView === 'quiz' && (
        <Quiz 
          topic={currentTopic}
          onFinishQuiz={finishQuiz}
        />
      )}

      {currentView === 'results' && (
        <QuizResults 
          topic={currentTopic}
          results={quizResults}
          onRetry={startQuiz}
          onBackHome={navigateToHome}
        />
      )}
    </div>
  );
}

export default App;
