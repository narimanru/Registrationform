import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/Button';
import { TOTAL_STEPS } from '../types/survey';

export const SurveyIntroPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/survey/step/1');
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-2xl">
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <h1 className="text-4xl font-semibold text-foreground mb-4">
            Пару вопросов — настроим FASTWMS под вас
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            {TOTAL_STEPS} вопросов · ~1 минута
          </p>
          
          <p className="text-base text-foreground/80 mb-12 max-w-xl mx-auto leading-relaxed">
            Включим нужные модули (WB/ЧЗ/УПД), покажем подсказки и уберём лишнее.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStart}
              className="sm:min-w-[200px]"
            >
              Начать
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleSkip}
              className="sm:min-w-[200px]"
            >
              Пропустить (можно позже)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};