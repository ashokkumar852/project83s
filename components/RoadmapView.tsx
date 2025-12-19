
import React from 'react';
import { StudyRoadmap } from '../types';

interface RoadmapViewProps {
  roadmap: StudyRoadmap;
  onClose: () => void;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ roadmap, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Study Roadmap
            </h2>
            <p className="text-slate-400 text-sm">Path to mastering: {roadmap.topic}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {roadmap.steps.map((step, idx) => (
            <div key={idx} className="relative pl-10 border-l-2 border-slate-800 last:border-0 pb-2">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-900 border-2 border-cyan-500 flex items-center justify-center">
                <span className="text-xs font-bold text-cyan-500">{idx + 1}</span>
              </div>
              <div className="mb-1 flex items-center gap-3">
                <h4 className="text-lg font-semibold text-slate-200">{step.title}</h4>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {step.duration}
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-slate-900/50 border-t border-slate-800 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-cyan-900/20"
          >
            Got it, Let's Study!
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapView;
