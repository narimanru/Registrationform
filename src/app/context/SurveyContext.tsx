import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SurveyData } from '../types/survey';

interface SurveyContextType {
  surveyData: SurveyData;
  updateSurveyData: (data: Partial<SurveyData>) => void;
  completeSurvey: () => void;
  closeSurvey: () => void;
  skipSurvey: () => void;
  resumeSurvey: () => void;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within SurveyProvider');
  }
  return context;
};

interface SurveyProviderProps {
  children: ReactNode;
}

export const SurveyProvider: React.FC<SurveyProviderProps> = ({ children }) => {
  const [surveyData, setSurveyData] = useState<SurveyData>(() => {
    const saved = localStorage.getItem('surveyData');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      currentStep: 0,
      lastStep: 0,
      status: 'in_progress',
      startedAt: new Date().toISOString()
    };
  });

  useEffect(() => {
    localStorage.setItem('surveyData', JSON.stringify(surveyData));
  }, [surveyData]);

  const updateSurveyData = (data: Partial<SurveyData>) => {
    setSurveyData(prev => ({
      ...prev,
      ...data,
      lastActivityAt: new Date().toISOString(),
      lastStep: Math.max(prev.lastStep, data.currentStep || prev.currentStep)
    }));
  };

  const completeSurvey = () => {
    setSurveyData(prev => ({
      ...prev,
      status: 'completed',
      completedAt: new Date().toISOString(),
      currentStep: 7,
      lastStep: 7
    }));
  };

  const closeSurvey = () => {
    setSurveyData(prev => ({
      ...prev,
      status: 'closed',
      lastActivityAt: new Date().toISOString()
    }));
  };

  const skipSurvey = () => {
    setSurveyData(prev => ({
      ...prev,
      status: 'skipped',
      lastActivityAt: new Date().toISOString()
    }));
  };

  const resumeSurvey = () => {
    setSurveyData(prev => ({
      ...prev,
      status: 'in_progress',
      lastActivityAt: new Date().toISOString()
    }));
  };

  return (
    <SurveyContext.Provider
      value={{
        surveyData,
        updateSurveyData,
        completeSurvey,
        closeSurvey,
        skipSurvey,
        resumeSurvey
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
