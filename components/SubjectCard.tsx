
import React from 'react';
import { EngineeringSubject } from '../types';

interface SubjectCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  onClick: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ title, description, icon, gradient, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative group cursor-pointer overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10`}
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}></div>
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      
      <div className="mt-6 flex items-center text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
        EXPLORE MODULES
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  );
};

export default SubjectCard;
