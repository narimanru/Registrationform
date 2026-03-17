import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  term: string;
  definition: string;
}

const tooltipDefinitions: Record<string, string> = {
  'SKU': 'Stock Keeping Unit - уникальный идентификатор товара. Каждый товар с разными характеристиками имеет свой SKU.',
  'Кабинеты': 'Личные кабинеты на маркетплейсах (Wildberries, Ozon и др.), через которые вы управляете продажами.',
  'Честный знак': 'Система маркировки товаров. Обязательна для определенных категорий товаров (обувь, одежда и др.).',
  'УПД': 'Универсальный передаточный документ - документ, объединяющий накладную и счет-фактуру.',
  'RBAC': 'Role-Based Access Control - система управления доступом на основе ролей пользователей.'
};

export const Tooltip: React.FC<TooltipProps> = ({ term, definition }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="inline-flex items-center justify-center ml-1 text-muted-foreground hover:text-primary transition-colors"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-foreground text-background rounded-lg shadow-lg text-sm">
          <div className="font-medium mb-1">{term}</div>
          <div className="text-xs opacity-90">{definition}</div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-foreground" />
        </div>
      )}
    </span>
  );
};

export const TermWithTooltip: React.FC<{ term: keyof typeof tooltipDefinitions }> = ({ term }) => {
  return (
    <>
      {term}
      <Tooltip term={term} definition={tooltipDefinitions[term]} />
    </>
  );
};
