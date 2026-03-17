import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useSurvey } from '../context/SurveyContext';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  company?: string;
}

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateSurveyData({
      userId: data.email,
      email: data.email,
      startedAt: new Date().toISOString()
    });
    
    setIsLoading(false);
    navigate('/survey/intro');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-foreground mb-3">
            FASTWMS
          </h1>
          <p className="text-muted-foreground text-lg">
            Создайте аккаунт для начала работы
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Имя"
              placeholder="Ваше имя"
              {...register('name', { required: 'Введите имя' })}
              error={errors.name?.message}
            />
            
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              {...register('email', {
                required: 'Введите email',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Некорректный email'
                }
              })}
              error={errors.email?.message}
            />
            
            <Input
              label="Пароль"
              type="password"
              placeholder="Минимум 8 символов"
              {...register('password', {
                required: 'Введите пароль',
                minLength: {
                  value: 8,
                  message: 'Минимум 8 символов'
                }
              })}
              error={errors.password?.message}
            />
            
            <Input
              label="Компания (необязательно)"
              placeholder="Название компании"
              {...register('company')}
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full mt-6"
            >
              Создать аккаунт
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Уже есть аккаунт?{' '}
            <button
              type="button"
              className="text-primary font-medium hover:underline"
              onClick={() => navigate('/login')}
            >
              Войти
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Создавая аккаунт, вы соглашаетесь с условиями использования
        </p>
      </div>
    </div>
  );
};