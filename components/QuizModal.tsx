
import React, { useState } from 'react';
import { QuizSet } from '../types';

interface QuizModalProps {
  quiz: QuizSet;
  onClose: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ quiz, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quiz.questions[currentIdx];

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    const percentage = (score / quiz.questions.length) * 100;
    let rank = "Apprentice";
    if (percentage === 100) rank = "Lead Engineer";
    else if (percentage >= 80) rank = "Senior Engineer";
    else if (percentage >= 60) rank = "Project Manager";

    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-10 text-center shadow-2xl">
          <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2">Quiz Complete!</h2>
          <p className="text-slate-400 mb-6">Subject: {quiz.subject}</p>
          
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400">{score}/{quiz.questions.length}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Score</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">{rank}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Rank</div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-cyan-900/20"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentIdx + 1) / quiz.questions.length) * 100;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl">
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-slate-800">
          <div 
            className="h-full bg-cyan-500 transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Question {currentIdx + 1} of {quiz.questions.length}</span>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = "w-full text-left p-4 rounded-xl border transition-all duration-200 ";
              if (!isAnswered) {
                btnClass += "bg-slate-800 border-slate-700 hover:border-cyan-500/50 hover:bg-slate-700 text-slate-300";
              } else {
                if (idx === currentQuestion.correctAnswer) {
                  btnClass += "bg-emerald-500/20 border-emerald-500 text-emerald-400";
                } else if (idx === selectedOption) {
                  btnClass += "bg-red-500/20 border-red-500 text-red-400";
                } else {
                  btnClass += "bg-slate-800 border-slate-700 opacity-50 text-slate-500";
                }
              }

              return (
                <button 
                  key={idx} 
                  onClick={() => handleOptionClick(idx)}
                  className={btnClass}
                  disabled={isAnswered}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-slate-950/50 flex items-center justify-center font-bold text-xs">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {option}
                  </div>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="mt-8 p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
              <p className="text-sm text-slate-300 leading-relaxed">
                <span className="font-bold text-cyan-400 mr-2">Explanation:</span>
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button 
              onClick={handleNext}
              disabled={!isAnswered}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${
                isAnswered 
                ? 'bg-white text-slate-900 hover:bg-slate-200' 
                : 'bg-slate-800 text-slate-600'
              }`}
            >
              {currentIdx === quiz.questions.length - 1 ? 'See Results' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
