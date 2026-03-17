import React from 'react';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';

interface BottomBarProps {
  onBack?: () => void;
  onNext?: () => void;
  onSkip?: () => void;
  nextDisabled?: boolean;
  nextLoading?: boolean;
  showBack?: boolean;
  showSkip?: boolean;
  nextLabel?: string;
  className?: string;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  onBack,
  onNext,
  onSkip,
  nextDisabled = false,
  nextLoading = false,
  showBack = true,
  showSkip = false,
  nextLabel = 'Далее',
  className
}) => {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 bg-card border-t border-border',
        'px-6 py-4 md:px-8 md:py-6',
        className
      )}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="flex gap-3">
          {showBack && onBack && (
            <Button variant="ghost" onClick={onBack}>
              Назад
            </Button>
          )}
          {showSkip && onSkip && (
            <Button variant="secondary" onClick={onSkip}>
              Пропустить
            </Button>
          )}
        </div>
        {onNext && (
          <Button
            variant="primary"
            onClick={onNext}
            disabled={nextDisabled}
            isLoading={nextLoading}
          >
            {nextLabel}
          </Button>
        )}
      </div>
    </div>
  );
};