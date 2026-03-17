import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="h-1 bg-secondary rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex flex-col items-center flex-1">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                ${step < currentStep 
                  ? 'bg-primary text-primary-foreground' 
                  : step === currentStep
                  ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                  : 'bg-secondary text-muted-foreground'
                }
              `}
            >
              {step < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-sm">{step}</span>
              )}
            </div>
            <span className="text-xs text-muted-foreground mt-2 hidden sm:block">
              Шаг {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
