import React from 'react';
import { useNavigate } from 'react-router';
import { PlayCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useSurvey } from '../context/SurveyContext';
import { TOTAL_STEPS, GOALS } from '../types/survey';
import * as ProgressPrimitive from '@radix-ui/react-progress';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { surveyData, resumeSurvey } = useSurvey();

  const handleResume = () => {
    resumeSurvey();
    const nextStep = Math.max(surveyData.lastStep, 1);
    navigate(`/survey/step/${nextStep}`);
  };

  const showOnboardingWidget =
    surveyData.status !== 'completed' && surveyData.status !== 'skipped';
  const remaining = TOTAL_STEPS - surveyData.lastStep;
  const progress = (surveyData.lastStep / TOTAL_STEPS) * 100;

  const selectedGoals = surveyData.primaryGoals?.map(goalValue => 
    GOALS.find(g => g.value === goalValue)
  ).filter(Boolean) || [];

  return (
    <div className="min-h-screen px-4 py-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-foreground mb-2">
            Добро пожаловать в FASTWMS
          </h1>
          <p className="text-muted-foreground">
            Управление складом и маркетплейсами
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Onboarding Widget */}
          {showOnboardingWidget && (
            <div className="lg:col-span-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    Завершите настройку профиля
                  </h2>
                  <p className="text-muted-foreground">
                    Осталось {remaining} из {TOTAL_STEPS} — займёт около 1 минуты.
                  </p>
                </div>
                <PlayCircle className="w-12 h-12 text-primary" />
              </div>

              <div className="mb-6">
                <ProgressPrimitive.Root
                  value={progress}
                  className="h-3 w-full overflow-hidden rounded-full bg-white/50"
                >
                  <ProgressPrimitive.Indicator
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </ProgressPrimitive.Root>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleResume}
              >
                Продолжить настройку
              </Button>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Быстрая статистика
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-semibold text-foreground">0</div>
                <div className="text-sm text-muted-foreground">Активных поставок</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-foreground">0</div>
                <div className="text-sm text-muted-foreground">SKU в системе</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-foreground">0</div>
                <div className="text-sm text-muted-foreground">Кабинетов</div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Goals */}
        {selectedGoals.length > 0 && (
          <div className="mt-8 bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Ваши приоритетные задачи
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedGoals.map((goal) => (
                <div
                  key={goal!.value}
                  className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-border"
                >
                  <span className="text-2xl">{goal!.icon}</span>
                  <span className="font-medium text-foreground">{goal!.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modules */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Остатки', description: 'Управление товарами на складах', icon: '📦' },
            { title: 'Поставки', description: 'Отправка на маркетплейсы', icon: '🚚' },
            { title: 'Отчёты', description: 'Аналитика и статистика', icon: '📊' }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all cursor-pointer"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Admin Link */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/admin')}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Перейти в панель администратора →
          </button>
        </div>
      </div>
    </div>
  );
};