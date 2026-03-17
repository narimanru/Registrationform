import React from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useSurvey } from '../context/SurveyContext';

export const SurveySuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { completeSurvey } = useSurvey();

  React.useEffect(() => {
    completeSurvey();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-card rounded-2xl shadow-lg p-12 text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="w-20 h-20 text-primary" />
          </div>
          
          <h1 className="text-4xl font-semibold text-foreground mb-4">
            Готово! FASTWMS настроен под вас ✅
          </h1>
          
          <p className="text-lg text-muted-foreground mb-12">
            Мы подготовили стартовый сценарий и включили нужные модули.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="sm:min-w-[240px]"
            >
              Перейти в систему
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
