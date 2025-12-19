
export enum EngineeringSubject {
  CS = 'Computer Science & Engineering',
  MECH = 'Mechanical Engineering',
  CIVIL = 'Civil Engineering',
  ELECTRICAL = 'Electrical & Electronics',
  CHEM = 'Chemical Engineering',
  AERO = 'Aerospace Engineering'
}

export interface Concept {
  id: string;
  title: string;
  subject: EngineeringSubject;
  summary: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface RoadmapStep {
  title: string;
  description: string;
  duration: string;
}

export interface StudyRoadmap {
  topic: string;
  steps: RoadmapStep[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

export interface QuizSet {
  subject: string;
  questions: QuizQuestion[];
}
