import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface OnboardingData {
  // Step 1: Role
  role?: string;
  
  // Step 2: Team size
  teamSize?: string;
  
  // Step 3: SKU count
  skuCount?: string;
  
  // Step 4: Sales platforms
  platforms?: string[];
  
  // Step 5: Warehouses and cabinets
  hasWarehouses?: boolean;
  warehouseCount?: string;
  hasCabinets?: boolean;
  cabinetPlatforms?: string[];
  
  // Step 6: Integrations
  integrations?: string[];
  
  // Step 7: Company registration
  companyName?: string;
  organizationType?: 'IP' | 'OOO';
  inn?: string;
  shortSellerName?: string;
  legalAddress?: string;
  
  // Meta
  currentStep?: number;
  completedAt?: string;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  resetData: () => void;
  isComplete: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('fastwms_onboarding');
    return saved ? JSON.parse(saved) : { currentStep: 1 };
  });

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => {
      const newData = { ...prev, ...updates };
      localStorage.setItem('fastwms_onboarding', JSON.stringify(newData));
      return newData;
    });
  };

  const resetData = () => {
    setData({ currentStep: 1 });
    localStorage.removeItem('fastwms_onboarding');
  };

  const isComplete = Boolean(data.completedAt);

  return (
    <OnboardingContext.Provider value={{ data, updateData, resetData, isComplete }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};
