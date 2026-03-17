import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Шаг {currentStep} из {totalSteps}
        </div>
        <div className="text-sm text-muted-foreground">
          {Math.round(progress)}% завершено
        </div>
      </div>
    </div>
  );
};
