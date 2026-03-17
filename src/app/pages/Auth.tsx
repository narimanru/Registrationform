import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Logo } from '../components/Logo';
import { motion } from 'motion/react';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simulate login - check if user exists
      const hasCompletedOnboarding = localStorage.getItem('fastwms_onboarding_completed');
      if (hasCompletedOnboarding) {
        navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      // Registration - start onboarding
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo and title */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <Logo size="lg" showText={false} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-semibold mb-2"
          >
            FASTWMS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground"
          >
            Система управления складом нового поколения
          </motion.p>
        </div>

        {/* Auth card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-card border border-border rounded-2xl p-8 shadow-sm"
        >
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`
                flex-1 py-2 px-4 rounded-lg transition-all
                ${isLogin 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-transparent text-muted-foreground hover:bg-secondary'
                }
              `}
            >
              Вход
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`
                flex-1 py-2 px-4 rounded-lg transition-all
                ${!isLogin 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-transparent text-muted-foreground hover:bg-secondary'
                }
              `}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm mb-2">Ваше имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  required
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Забыли пароль?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
            >
              {isLogin ? 'Войти' : 'Создать аккаунт'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {!isLogin && (
            <p className="text-xs text-muted-foreground text-center mt-4">
              Регистрируясь, вы соглашаетесь с условиями использования и политикой конфиденциальности
            </p>
          )}
        </motion.div>

        {/* Features */}
        {!isLogin && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 grid grid-cols-3 gap-4 text-center"
          >
            <div>
              <div className="text-2xl font-semibold text-primary">5 мин</div>
              <div className="text-xs text-muted-foreground">Быстрая настройка</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-primary">24/7</div>
              <div className="text-xs text-muted-foreground">Поддержка</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-primary">99.9%</div>
              <div className="text-xs text-muted-foreground">Доступность</div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};