import React from 'react';
import { useNavigate } from 'react-router';
import { useOnboarding } from '../context/OnboardingContext';
import { Logo } from '../components/Logo';
import { 
  Package, 
  TrendingUp, 
  Users, 
  Activity, 
  ArrowRight,
  CheckCircle2,
  Clock,
  BarChart3,
  Settings
} from 'lucide-react';
import { motion } from 'motion/react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data, isComplete } = useOnboarding();

  const stats = [
    { label: 'Заказы сегодня', value: '127', change: '+12%', icon: Package, trend: 'up' },
    { label: 'Выручка', value: '₽847K', change: '+23%', icon: TrendingUp, trend: 'up' },
    { label: 'Активные SKU', value: data.skuCount || '0', change: '+5%', icon: BarChart3, trend: 'up' },
    { label: 'Команда', value: data.teamSize || '1', change: '0%', icon: Users, trend: 'neutral' },
  ];

  const getProgressPercentage = () => {
    if (isComplete) return 100;
    const currentStep = data.currentStep || 1;
    return Math.round((currentStep / 7) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">FASTWMS</h1>
                <p className="text-sm text-muted-foreground">
                  {data.companyName || 'Мой бизнес'}
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Onboarding widget - показывается если не завершено */}
        {!isComplete && (
          <div className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Завершите настройку</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Вы прошли {data.currentStep || 1} из 7 шагов. Завершите настройку, чтобы получить полный доступ ко всем функциям.
                </p>
                
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Прогресс</span>
                    <span className="font-medium text-primary">{getProgressPercentage()}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${getProgressPercentage()}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => navigate('/onboarding')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all group"
                >
                  Продолжить настройку
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Completed status */}
        {isComplete && (
          <div className="mb-8 bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">Настройка завершена</h3>
                <p className="text-sm text-muted-foreground">
                  Ваша система настроена и готова к работе
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  ${stat.trend === 'up' ? 'bg-primary/10' : 'bg-secondary'}
                `}>
                  <stat.icon className={`w-6 h-6 ${stat.trend === 'up' ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <span className={`
                  text-sm px-2 py-1 rounded-lg
                  ${stat.trend === 'up' 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-secondary text-muted-foreground'
                  }
                `}>
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-semibold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Быстрые действия</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group">
              <Package className="w-8 h-8 text-primary mb-2" />
              <div className="font-medium mb-1">Новая поставка</div>
              <div className="text-sm text-muted-foreground">Создать поступление товара</div>
            </button>
            <button className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group">
              <TrendingUp className="w-8 h-8 text-primary mb-2" />
              <div className="font-medium mb-1">Отчеты</div>
              <div className="text-sm text-muted-foreground">Посмотреть аналитику</div>
            </button>
            <button 
              onClick={() => navigate('/admin')}
              className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
            >
              <Activity className="w-8 h-8 text-primary mb-2" />
              <div className="font-medium mb-1">Админ-панель</div>
              <div className="text-sm text-muted-foreground">Управление системой</div>
            </button>
          </div>
        </div>

        {/* Platform integrations */}
        {data.platforms && data.platforms.length > 0 && (
          <div className="mt-8 bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Ваши платформы</h3>
            <div className="flex flex-wrap gap-3">
              {data.platforms.map((platform) => (
                <div
                  key={platform}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-lg border border-primary/20"
                >
                  {platform}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};