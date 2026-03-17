import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

type TooltipTerm = 'SKU' | 'Кабинеты' | 'Честный знак' | 'УПД' | 'RBAC';

interface TermWithTooltipProps {
  term: TooltipTerm;
}

const tooltipContent: Record<TooltipTerm, string> = {
  'SKU': 'Stock Keeping Unit - уникальный идентификатор товара в системе учета',
  'Кабинеты': 'Личные кабинеты на маркетплейсах для управления товарами и заказами',
  'Честный знак': 'Система маркировки и прослеживания товаров в России',
  'УПД': 'Универсальный передаточный документ - документ для оформления передачи товаров',
  'RBAC': 'Role-Based Access Control - управление доступом на основе ролей пользователей',
};

export const TermWithTooltip: React.FC<TermWithTooltipProps> = ({ term }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="relative inline-flex items-center gap-1">
      <span>{term}</span>
      <button
        type="button"
        className="inline-flex items-center justify-center group"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        <HelpCircle className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </button>
      
      {isVisible && (
        <div className="absolute left-0 top-full mt-2 z-50 w-64 p-3 bg-popover text-popover-foreground text-sm rounded-lg border border-border shadow-lg">
          {tooltipContent[term]}
        </div>
      )}
    </span>
  );
};
