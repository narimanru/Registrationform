import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OptionCardProps {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  value,
  label,
  description,
  icon,
  selected = false,
  onClick,
  disabled = false
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full p-5 rounded-xl border transition-all duration-200 text-left',
        'hover:border-primary/50 hover:bg-muted/30',
        'focus:outline-none focus:ring-2 focus:ring-primary/20',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        selected
          ? 'border-primary bg-primary/5'
          : 'border-border bg-card'
      )}
    >
      <div className="flex items-start gap-4">
        {icon && <span className="text-2xl">{icon}</span>}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">{label}</h4>
            {selected && (
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </button>
  );
};