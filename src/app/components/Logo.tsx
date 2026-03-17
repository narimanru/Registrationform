import React from 'react';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg`}>
        <Sparkles className={`${iconSizes[size]} text-primary-foreground`} />
      </div>
      {showText && (
        <span className={`${textSizes[size]} font-semibold tracking-tight`}>
          FASTWMS
        </span>
      )}
    </div>
  );
};
