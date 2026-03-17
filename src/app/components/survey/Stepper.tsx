import React from 'react';
import { TOTAL_STEPS } from '../../types/survey';

interface StepperProps {
  currentStep: number;
  isMobile?: boolean;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, isMobile = false }) => {
  const remaining = TOTAL_STEPS - currentStep;
  
  if (isMobile) {
    return (
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{currentStep}/{TOTAL_STEPS}</span>
        <span>осталось {remaining} · ~1 мин</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>Вопрос {currentStep} из {TOTAL_STEPS} · осталось {remaining} · ~1 минута</span>
    </div>
  );
};
