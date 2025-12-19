
import React, { useState } from 'react';
import { SUBJECT_DATA } from './constants';
import { EngineeringSubject, StudyRoadmap, QuizSet } from './types';
import SubjectCard from './components/SubjectCard';
import TutorPanel from './components/TutorPanel';
import RoadmapView from './components/RoadmapView';
import QuizModal from './components/QuizModal';
import { generateStudyRoadmap, generateQuiz } from './services/geminiService';

const App: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<EngineeringSubject | null>(null);
  const [roadmap, setRoadmap] = useState<StudyRoadmap | null>(null);
  const [quiz, setQuiz] = useState<QuizSet | null>(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [roadmapQuery, setRoadmapQuery] = useState('');

  const handleGenerateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roadmapQuery.trim()) return;
    
    setLoadingRoadmap(true);
    const result = await generateStudyRoadmap(roadmapQuery);
    if (result) {
      setRoadmap(result);
    }
    setLoadingRoadmap(false);
  };

  const handleStartQuiz = async (subject: EngineeringSubject) => {
    setLoadingQuiz(true);
    const result = await generateQuiz(subject);
    if (result) {
      setQuiz(result);
      setSelectedSubject(null); // Close subject details modal
    }
    setLoadingQuiz(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-12 text-center">
        <div className="inline-flex items-center justify-center p-2 mb-4 bg-cyan-500/10 rounded-full border border-cyan-500/20">
          <span className="px-3 py-1 text-xs font-bold text-cyan-400 uppercase tracking-widest">
            The Ultimate Engineering Hub
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
          Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Engineering</span> Journey
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          From first principles to complex derivations. Get AI-powered study guides, 
          real-time concept explanations, and interactive quizzes.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Subjects & Tools */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Core Subjects
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SUBJECT_DATA.map((subject) => (
                <SubjectCard 
                  key={subject.id}
                  title={subject.type}
                  description={subject.description}
                  icon={subject.icon}
                  gradient={subject.color}
                  onClick={() => setSelectedSubject(subject.type)}
                />
              ))}
            </div>
          </section>

          {/* Roadmap Generator Tool */}
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-slate-100 mb-2">Smart Study Planner</h2>
              <p className="text-slate-400 mb-6">Tell us what you want to learn, and we'll generate a custom engineering curriculum for you.</p>
              
              <form onSubmit={handleGenerateRoadmap} className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  value={roadmapQuery}
                  onChange={(e) => setRoadmapQuery(e.target.value)}
                  placeholder="e.g. Finite Element Analysis, Blockchain, Microfluidics..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-6 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <button 
                  type="submit"
                  disabled={loadingRoadmap}
                  className="px-8 py-3 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loadingRoadmap ? (
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                  ) : 'Generate Path'}
                </button>
              </form>
            </div>
          </section>
        </div>

        {/* Right Column - AI Tutor & Support */}
        <div className="space-y-8">
          <TutorPanel />
          
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">Formula Quick-Ref</h3>
            <p className="text-indigo-200 text-sm mb-4">Common constants & laws at your fingertips.</p>
            <div className="space-y-3">
              {[
                { label: "Gravitational Constant", val: "6.674 × 10⁻¹¹ m³/kg·s²" },
                { label: "Euler's Number", val: "2.71828" },
                { label: "Ideal Gas Constant", val: "8.314 J/mol·K" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-950/40 p-3 rounded-xl border border-white/5">
                  <span className="text-xs text-slate-400">{item.label}</span>
                  <span className="text-sm font-mono text-cyan-400">{item.val}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-xs font-bold rounded-lg transition-colors border border-indigo-500/30">
              VIEW ALL CONSTANTS
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>&copy; 2024 EngiHub. Empowering the next generation of builders.</p>
      </footer>

      {/* Modals */}
      {roadmap && <RoadmapView roadmap={roadmap} onClose={() => setRoadmap(null)} />}
      
      {quiz && <QuizModal quiz={quiz} onClose={() => setQuiz(null)} />}
      
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-8 shadow-2xl relative">
            <h2 className="text-2xl font-bold text-white mb-2">{selectedSubject}</h2>
            <p className="text-slate-400 text-sm mb-6">Explore professional modules or test your knowledge with an AI quiz.</p>
            
            <div className="space-y-3 mb-8">
              <button 
                onClick={() => handleStartQuiz(selectedSubject)}
                disabled={loadingQuiz}
                className="w-full p-4 bg-cyan-600/10 border border-cyan-500/30 rounded-2xl hover:bg-cyan-600/20 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-slate-100">Take Assessment Quiz</span>
                    <span className="text-xs text-slate-500">5 dynamic AI questions</span>
                  </div>
                </div>
                {loadingQuiz ? (
                  <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5 text-slate-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>

              <div className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                <span className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-widest">Available Modules</span>
                <div className="space-y-2">
                  {['Module 1: Foundations', 'Module 2: Advanced Topics'].map((m, i) => (
                    <div key={i} className="p-3 bg-slate-800 rounded-xl border border-slate-700 hover:border-slate-500 cursor-pointer transition-colors flex justify-between items-center group">
                      <span className="text-slate-300 text-sm">{m}</span>
                      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedSubject(null)}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 font-medium rounded-xl transition-colors border border-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
